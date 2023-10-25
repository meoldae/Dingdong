package com.ssafy.dingdong.domain.room.dto.response;

public record FurnitureSummaryDto(
	String furnitureId,
	Long categoryId,
	String thumbnail
) {
	public FurnitureSummaryDto(String furnitureId, Long categoryId, String thumbnail){
		this.furnitureId = furnitureId;
		this.categoryId = categoryId;
		this.thumbnail = thumbnail;
	}
}
