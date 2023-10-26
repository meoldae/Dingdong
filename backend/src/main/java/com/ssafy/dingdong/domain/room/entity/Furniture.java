package com.ssafy.dingdong.domain.room.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Furniture {

	@Id
	private String furnitureId;

	@OneToOne
	@JoinColumn(name = "categoryId")
	private FurnitureCategory furnitureCategory;
	private String thumbnail;
	private Float xSize;
	private Float ySize;
	private Float zSize;

}
