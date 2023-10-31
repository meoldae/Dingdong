package com.ssafy.dingdong.domain.room.dto.response;

import com.ssafy.dingdong.domain.room.entity.Furniture;

public record FurnitureDetailDto(
	String furnitureId,
	Long categoryId,
	String description,
	int xSize,
	int ySize,
	int zSize,
	int xDefault,
	int yDefault,
	int zDefault
) {

	public FurnitureDetailDto(Furniture furniture){
		this(furniture.getFurnitureId(),
			furniture.getFurnitureCategory().getCategoryId(),
			furniture.getFurnitureCategory().getDescription(),
			(int) Math.ceil(furniture.getXSize() / 0.24f) + ((int) Math.ceil(furniture.getXSize() / 0.24f) % 2 == 1 ? 1 : 0),
			(int) Math.ceil(furniture.getYSize() / 0.24f) + ((int) Math.ceil(furniture.getYSize() / 0.24f) % 2 == 1 ? 1 : 0) - 1,
			(int) Math.ceil(furniture.getZSize() / 0.24f) + ((int) Math.ceil(furniture.getZSize() / 0.24f) % 2 == 1 ? 1 : 0),
			furniture.getFurnitureCategory().getXDefault(),
			furniture.getFurnitureCategory().getYDefault(),
			furniture.getFurnitureCategory().getZDefault());
	}
}
