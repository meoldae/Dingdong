package com.ssafy.dingdong.domain.room.dto.request;

import java.util.List;

public record UpdateFurnitureDto(
	Long roomFurnitureId,
	String furnitureId,
	List<Integer> position,
	short rotation
) {

}