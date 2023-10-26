package com.ssafy.dingdong.domain.room.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ssafy.dingdong.domain.room.dto.request.RoomUpdateRequestDto;
import com.ssafy.dingdong.domain.room.dto.response.FurnitureDetailDto;
import com.ssafy.dingdong.domain.room.dto.response.FurnitureSummaryDto;
import com.ssafy.dingdong.domain.room.dto.response.RoomResponseDto;

public interface RoomService {

    RoomResponseDto getRoomByMemberId(String memberId);

    RoomResponseDto getRoomByRoomId(Long roomId);

    void createRoom(String memberId);

    Page<FurnitureSummaryDto> getFurnitureList(Pageable pageable);

    Page<FurnitureSummaryDto> getFurnitureListByCategory(Integer category, Pageable pageable);

    FurnitureDetailDto getFurnitureByFurnitureId(String furnitureId);

	void updateRoom(RoomUpdateRequestDto roomUpdateRequestDto, String name);

	void createHeartRoom(String memberId, Long roomId);
}
