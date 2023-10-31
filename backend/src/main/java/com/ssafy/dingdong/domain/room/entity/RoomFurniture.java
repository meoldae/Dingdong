package com.ssafy.dingdong.domain.room.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.ssafy.dingdong.domain.room.dto.request.UpdateFurnitureDto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class RoomFurniture {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long roomFurnitureId;
	private Long roomId;
	private String furnitureId;
	private int xPos;
	private int yPos;
	private int zPos;
	private Short rotation;

	public void updateStatus(UpdateFurnitureDto updateFurnitureDto){
		this.xPos = updateFurnitureDto.position().get(0);
		this.yPos = updateFurnitureDto.position().get(1);
		this.zPos = updateFurnitureDto.position().get(2);
		this.rotation = updateFurnitureDto.rotation();
	}
}
