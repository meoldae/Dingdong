package com.ssafy.dingdong.domain.room.dto.response;

import java.util.List;

import com.ssafy.dingdong.domain.room.entity.Furniture;

import lombok.Builder;

public record RoomResponseDto(
	Long roomId,
	List<Furniture> furnitureList
) {
	@Builder
	public RoomResponseDto(Long roomId, List<Furniture> furnitureList) {
		this.roomId = roomId;
		this.furnitureList = furnitureList;
	}
}
