package com.ssafy.dingdong.domain.room.dto.response;

import lombok.Builder;

public record FurnitureSummaryDto(
	String furnitureId,
	Long categoryId,
	String thumbnail
) {
	@Builder
	public FurnitureSummaryDto(String furnitureId, Long categoryId, String thumbnail){
		this.furnitureId = furnitureId;
		this.categoryId = categoryId;
		this.thumbnail = thumbnail;
	}
}
