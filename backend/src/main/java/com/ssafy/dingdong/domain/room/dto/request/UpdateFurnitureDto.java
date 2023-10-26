package com.ssafy.dingdong.domain.room.dto.request;

public record UpdateFurnitureDto(
	Long roomFurnitureId,
	String furnitureId,
	int xPos,
	int yPos,
	int zPos,
	short rotation
) {

}