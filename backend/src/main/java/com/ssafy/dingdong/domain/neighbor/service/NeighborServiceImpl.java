package com.ssafy.dingdong.domain.neighbor.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.dingdong.domain.FCM.service.FCMService;
import com.ssafy.dingdong.domain.member.dto.response.MemberMainDto;
import com.ssafy.dingdong.domain.member.service.MemberService;
import com.ssafy.dingdong.domain.neighbor.dto.request.NeighborRequest;
import com.ssafy.dingdong.domain.neighbor.dto.response.NeighborRequestResponseDto;
import com.ssafy.dingdong.domain.neighbor.dto.response.NeighborResponse;
import com.ssafy.dingdong.domain.neighbor.entity.Neighbor;
import com.ssafy.dingdong.domain.neighbor.repository.NeighborRepository;
import com.ssafy.dingdong.domain.room.entity.Room;
import com.ssafy.dingdong.domain.room.repository.RoomRepository;
import com.ssafy.dingdong.domain.room.service.RoomService;
import com.ssafy.dingdong.global.exception.CustomException;
import com.ssafy.dingdong.global.exception.ExceptionStatus;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class NeighborServiceImpl implements NeighborService{

	private final NeighborRepository neighborRepository;
	private final MemberService memberService;
	private final RoomRepository roomRepository;
	private final RoomService roomService;
	private final FCMService fcmService;

	@Override
	@Transactional
	public void createNeighborRequest(Long acceptorRoomId, String applicantId) {
		Room room = roomRepository.findByRoomId(acceptorRoomId).orElseThrow(
			() -> new CustomException(ExceptionStatus.ROOM_NOT_FOUND)
		);

		String acceptorId = room.getMemberId();

		neighborRepository.isConnectByApplicantIdAndAcceptorId(UUID.fromString(applicantId), UUID.fromString(acceptorId)).ifPresent(
			neighbor -> {
				if (neighbor.getConnectTime() != null && neighbor.getCancelTime() == null) {
					throw new CustomException(ExceptionStatus.NEIGHBOR_ALREADY_CONNECTED);
				}
			}
		);

		neighborRepository.findByApplicantIdAndAcceptorId(UUID.fromString(applicantId), UUID.fromString(acceptorId)).ifPresentOrElse(
			request -> {
				if (request.getCancelTime() != null) {
					request.renewal();
				} else {
					throw new CustomException(ExceptionStatus.NEIGHBOR_REQUEST_ALREADY_EXIST);
				}
			},
			() -> {
				Neighbor request = Neighbor.builder()
					.applicantId(UUID.fromString(applicantId))
					.acceptorId(UUID.fromString(acceptorId))
					.createTime(LocalDateTime.now())
					.build();
				neighborRepository.save(request);
			}
		);
		fcmService.send(applicantId, acceptorId, 1);
	}

	@Override
	public List<NeighborRequestResponseDto> getRequestList(String memberId) {
		List<NeighborRequestResponseDto> result = new ArrayList<>();

		neighborRepository.findAllRequestByMemberId(UUID.fromString(memberId)).stream().forEach(
			neighborRequest -> {

				String nickname = memberService.getMemberById(neighborRequest.getApplicantId().toString()).nickname();

				NeighborRequestResponseDto requestResponseDto = NeighborRequestResponseDto.builder()
					.neighborId(neighborRequest.getNeighborId())
					.memberId(neighborRequest.getApplicantId().toString())
					.nickname(nickname)
					.build();
				result.add(requestResponseDto);
			}
		);
		return result;
	}

	@Override
	@Transactional
	public void setNeighborStatus(NeighborRequest neighborRequest) {
		if (neighborRequest.flag().equals("Y")) {
			Neighbor neighborStatus = neighborRepository.findByNeighborId(neighborRequest.neighborId()).orElseThrow(
				() -> new CustomException(ExceptionStatus.NEIGHBOR_REQUEST_DOES_NOT_EXIST)
			);
			// 요청 수락
			neighborStatus.connect(LocalDateTime.now());
		}else {
			// 요청 거절 및 삭제
			neighborRepository.deleteByNeighborId(neighborRequest.neighborId());
		}
	}

	@Override
	@Transactional
	public List getNeighborList(String memberId) {
		List<UUID> neighborIdList = neighborRepository.findAllByMemberId(UUID.fromString(memberId));
		List<NeighborResponse> neighborList = new LinkedList<NeighborResponse>();

		neighborIdList.stream().forEach(
			neighborId -> {

				MemberMainDto member = memberService.getMemberById(neighborId.toString());
				Long roomId = roomService.getRoomIdByMemberId(member.memberId().toString());
				boolean status = memberService.getStatusByMemberId(neighborId.toString());
				NeighborResponse neighbor = member.to(status, roomId);
				neighborList.add(neighbor);
			}
		);
		return neighborList;
	}

	@Override
	public String isNeigborByRoomId(Long targetRoomId, String applicantId) {
		Room room = roomRepository.findByRoomId(targetRoomId).orElseThrow(
			() -> new CustomException(ExceptionStatus.ROOM_NOT_FOUND)
		);

		String acceptorId = room.getMemberId();
		String[] result = {"F"};
		neighborRepository.findByApplicantIdAndAcceptorId(UUID.fromString(applicantId), UUID.fromString(acceptorId)).ifPresentOrElse(
			neighbor -> {
				if (neighbor.getConnectTime() != null && neighbor.getCancelTime() == null) {
					result[0] = "Y";
 				} else {
					result[0] = "F";
				}
			},
			() -> {
				result[0] = "F";
			}
		);

		return result[0];
	}

	@Override
	@Transactional
	public void deleteNeighbor(Map<String, Object> paramMap, String myMemberId) {
		UUID myMemberUUID = UUID.fromString(myMemberId);
		UUID otherMemberUUID = null;
		if (paramMap.containsKey("memberId")) {
			otherMemberUUID = UUID.fromString(paramMap.get("memberId").toString());
		}else if (paramMap.containsKey("roomId")) {
			Long roomId = Long.valueOf(paramMap.get("roomId").toString());
			Room room = roomRepository.findByRoomId(roomId).orElseThrow(
				() -> new CustomException(ExceptionStatus.ROOM_NOT_FOUND)
			);
			otherMemberUUID = UUID.fromString(room.getMemberId());
		}
		Neighbor neighbor = neighborRepository.deleteByApplicantIdAndAcceptorId(myMemberUUID, otherMemberUUID)
			.orElseThrow(
				() -> new CustomException(ExceptionStatus.NEIGHBOR_NOT_FOUND)
			);
		neighbor.disconnect(LocalDateTime.now());
	}
}
