package com.ssafy.dingdong.domain.room.dto.response;

import java.util.List;

import com.ssafy.dingdong.domain.room.entity.RoomFurniture;

import lombok.Builder;

public record RoomResponseDto(
	Long roomId,
	Long heartCount,
	List<RoomFurniture> roomFurnitureList
) {
	@Builder
	public RoomResponseDto(Long roomId, Long heartCount, List<RoomFurniture> roomFurnitureList) {
		this.roomId = roomId;
		this.heartCount = heartCount;
		this.roomFurnitureList = roomFurnitureList;
	}
}
