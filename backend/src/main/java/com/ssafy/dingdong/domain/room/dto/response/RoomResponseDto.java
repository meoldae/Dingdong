package com.ssafy.dingdong.domain.room.dto.response;

import java.util.List;

import com.ssafy.dingdong.domain.room.entity.RoomFurniture;

import lombok.Builder;

public record RoomResponseDto(
	Long roomId,
	List<RoomFurniture> roomFurnitureList
) {
	@Builder
	public RoomResponseDto(Long roomId, List<RoomFurniture> roomFurnitureList) {
		this.roomId = roomId;
		this.roomFurnitureList = roomFurnitureList;
	}
}
