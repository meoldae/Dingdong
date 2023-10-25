package com.ssafy.dingdong.domain.room.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Getter;

@Entity
@Getter
public class RoomFurniture {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long furnitureId;
	private Long roomId;
	private String assetId;
	private Float xPos;
	private Float yPos;
	private Float zPos;
	private Short rotation;

}
