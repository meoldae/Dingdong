package com.ssafy.dingdong.domain.room.dto.response;

import java.util.List;

import com.ssafy.dingdong.domain.room.entity.Furniture;
import com.ssafy.dingdong.domain.room.entity.RoomFurniture;

import lombok.Getter;

@Getter
public class RoomFurnitureDetailDto {

	private String furnitureId;
	private Long categoryId;
	private float[] size;
	private int[] defaultPosition;
	private int[] position;
	private int rotation;

	public RoomFurnitureDetailDto(FurnitureDetailDto furnitureDetailDto, RoomFurniture roomFurniture) {
		this.furnitureId = furnitureDetailDto.furnitureId();
		this.categoryId = furnitureDetailDto.categoryId();
		this.size = new float[]{ furnitureDetailDto.xSize(), furnitureDetailDto.ySize(), furnitureDetailDto.zSize() };
		this.defaultPosition = new int[]{ furnitureDetailDto.xDefault(), furnitureDetailDto.yDefault(), furnitureDetailDto.zDefault() };
		this.position = new int[]{ roomFurniture.getXPos(), roomFurniture.getYPos(), roomFurniture.getZPos() };
		this.rotation = roomFurniture.getRotation();
	}
}
