package com.ssafy.dingdong.domain.room.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.dingdong.domain.room.dto.request.RoomUpdateRequestDto;
import com.ssafy.dingdong.domain.room.dto.response.FurnitureDetailDto;
import com.ssafy.dingdong.domain.room.dto.response.FurnitureSummaryDto;
import com.ssafy.dingdong.domain.room.dto.response.RoomResponseDto;
import com.ssafy.dingdong.domain.room.entity.Furniture;
import com.ssafy.dingdong.domain.room.entity.Room;
import com.ssafy.dingdong.domain.room.entity.RoomFurniture;
import com.ssafy.dingdong.domain.room.entity.RoomHeart;
import com.ssafy.dingdong.domain.room.repository.FurnitureRepository;
import com.ssafy.dingdong.domain.room.repository.RoomFurnitureRepository;
import com.ssafy.dingdong.domain.room.repository.RoomHeartRepository;
import com.ssafy.dingdong.domain.room.repository.RoomRepository;
import com.ssafy.dingdong.global.exception.CustomException;
import com.ssafy.dingdong.global.exception.ExceptionStatus;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

	private final RoomRepository roomRepository;
	private final RoomFurnitureRepository roomFurnitureRepository;
	private final FurnitureRepository furnitureRepository;
	private final RoomHeartRepository roomHeartRepository;

	@Override
	@Transactional
	public RoomResponseDto getRoomByMemberId(String memberId) {
		Room findRoom = roomRepository.findByMemberId(memberId).orElseThrow(
			() -> new CustomException(ExceptionStatus.ROOM_NOT_FOUND)
		);
		Long heartCount = roomHeartRepository.getCountByRoomId(findRoom.getRoomId());
		return findRoom.toRoomResponseDto(heartCount);
	}

	@Override
	@Transactional
	public RoomResponseDto getRoomByRoomId(Long roomId) {
		Room findRoom = roomRepository.findByRoomId(roomId).orElseThrow(
			() -> new CustomException(ExceptionStatus.ROOM_NOT_FOUND)
		);
		Long heartCount = roomHeartRepository.getCountByRoomId(findRoom.getRoomId());
		return findRoom.toRoomResponseDto(heartCount);
	}

	@Override
	public void createRoom(String memberId) {
		Room room = Room.builder()
			.memberId(memberId)
			.build();
		roomRepository.save(room);
	}

	@Override
	public Page<FurnitureSummaryDto> getFurnitureList(Pageable pageable) {
		return furnitureRepository.findAllFurnitureSummaryDto(pageable);

	}

	@Override
	public Page<FurnitureSummaryDto> getFurnitureListByCategory(Integer category, Pageable pageable) {
		return furnitureRepository.findAllByCategoryId(category, pageable);
	}

	@Override
	public FurnitureDetailDto getFurnitureByFurnitureId(String furnitureId) {
		Furniture furniture = furnitureRepository.findById(furnitureId).orElseThrow(
			() -> new CustomException(ExceptionStatus.FURNITURE_NOT_FOUND)
		);
		return new FurnitureDetailDto(furniture);
	}

	@Override
	@Transactional
	public void updateRoom(RoomUpdateRequestDto roomUpdateRequestDto, String memberId) {
		List<RoomFurniture> roomFurnitureList = getRoomByMemberId(memberId).roomFurnitureList();
		Map<Long, RoomFurniture> roomFurnitureMap = new HashMap<Long, RoomFurniture>();

		roomFurnitureList.stream().forEach(
			roomFurniture -> roomFurnitureMap.put(roomFurniture.getRoomFurnitureId(), roomFurniture)
		);

		Long roomId = roomUpdateRequestDto.getRoomId();
		roomUpdateRequestDto.getUpdateFurnitureList().stream().forEach(
			updateFurniture -> {
				log.info(updateFurniture);
				if (updateFurniture.roomFurnitureId() == -1) {
					RoomFurniture newRoomFurniture = RoomFurniture.builder()
						.roomId(roomId)
						.furnitureId(updateFurniture.furnitureId())
						.xPos(updateFurniture.xPos())
						.yPos(updateFurniture.yPos())
						.zPos(updateFurniture.zPos())
						.rotation(updateFurniture.rotation())
						.build();
					roomFurnitureRepository.save(newRoomFurniture);
				} else {
					RoomFurniture findRoomFurniture = roomFurnitureMap.get(updateFurniture.roomFurnitureId());
					roomFurnitureMap.remove(updateFurniture.roomFurnitureId());

					findRoomFurniture.updateStatus(updateFurniture);
				}
			}
		);
		roomFurnitureRepository.deleteAllById(roomFurnitureMap.keySet());
	}

	@Override
	@Transactional
	public void createHeartRoom(String memberId, Long roomId) {
		roomHeartRepository.findByMemberIdAndRoomId(memberId, roomId)
			.ifPresentOrElse(
				RoomHeart::updateStatus,
				() -> {
					RoomHeart newRecord = RoomHeart.builder()
						.memberId(memberId)
						.roomId(roomId)
						.build();
					roomHeartRepository.save(newRecord);
				}
			);
	}
}
