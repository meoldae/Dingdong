package com.ssafy.dingdong.domain.room.dto.response;

import java.util.List;

import lombok.Builder;

public record RoomResponseAllDetailDto(
	String nickname,
	Long roomId,
	Long heartCount,
	List<RoomFurnitureDetailDto> roomFurnitureList
) {
	@Builder
	public RoomResponseAllDetailDto(String nickname, Long roomId, Long heartCount, List<RoomFurnitureDetailDto> roomFurnitureList) {
		this.nickname = nickname;
		this.roomId = roomId;
		this.heartCount = heartCount;
		this.roomFurnitureList = roomFurnitureList;
	}
}
