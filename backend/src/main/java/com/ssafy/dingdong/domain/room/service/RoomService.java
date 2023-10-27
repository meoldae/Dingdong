package com.ssafy.dingdong.domain.room.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ssafy.dingdong.domain.room.dto.request.RoomUpdateRequestDto;
import com.ssafy.dingdong.domain.room.dto.response.FurnitureDetailDto;
import com.ssafy.dingdong.domain.room.dto.response.FurnitureSummaryDto;
import com.ssafy.dingdong.domain.room.dto.response.RoomResponseDto;
import com.ssafy.dingdong.domain.room.dto.response.RoomScoreDto;

public interface RoomService {

    RoomResponseDto getRoomByMemberId(String memberId);

    RoomResponseDto getRoomByRoomId(Long roomId);

    void createRoom(String memberId);

    Page<FurnitureSummaryDto> getFurnitureList(Pageable pageable);

    Page<FurnitureSummaryDto> getFurnitureListByCategory(Integer category, Pageable pageable);

    FurnitureDetailDto getFurnitureByFurnitureId(String furnitureId);

	void updateRoom(RoomUpdateRequestDto roomUpdateRequestDto, String name);

	void createHeartRoom(String memberId, Long roomId);

	List<RoomScoreDto> getRoomScore();

    Long getRoomIdByMemberId(String memberId);
}
