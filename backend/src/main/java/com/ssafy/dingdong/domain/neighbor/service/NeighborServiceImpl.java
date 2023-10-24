package com.ssafy.dingdong.domain.neighbor.service;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.dingdong.domain.member.dto.response.MemberMainDto;
import com.ssafy.dingdong.domain.member.service.MemberService;
import com.ssafy.dingdong.domain.neighbor.dto.request.NeighborRequest;
import com.ssafy.dingdong.domain.neighbor.dto.response.NeighborResponse;
import com.ssafy.dingdong.domain.neighbor.entity.Neighbor;
import com.ssafy.dingdong.domain.neighbor.repository.NeighborRepository;
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

	@Override
	@Transactional
	public void createNeighborRequest(String acceptorId, String applicantId) {
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
	}

	@Override
	public List<String> getRequestList(String memberId) {
		return neighborRepository.findAllRequestByMemberId(UUID.fromString(memberId));
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
		List neighborIdList = neighborRepository.findAllByMemberId(UUID.fromString(memberId));
		List neighborList = new LinkedList<NeighborResponse>();

		neighborIdList.stream().forEach(
			neighborId -> {
				MemberMainDto member = memberService.getMemberById(neighborId.toString());
				String status = memberService.getStatusByMemberId(neighborId.toString());
				NeighborResponse neighbor = member.to(status);
				neighborList.add(neighbor);
			}
		);
		return neighborList;
	}
}
