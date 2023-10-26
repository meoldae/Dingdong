package com.ssafy.dingdong.domain.room.dto.response;

import lombok.Builder;

public record FurnitureSummaryDto(
	String furnitureId,
	Long categoryId
) {
	@Builder
	public FurnitureSummaryDto(String furnitureId, Long categoryId){
		this.furnitureId = furnitureId;
		this.categoryId = categoryId;
	}
}
