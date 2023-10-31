package com.ssafy.dingdong.domain.neighbor.dto.response;

import lombok.Builder;

public record NeighborRequestResponseDto(
	Long neighborId,
	String memberId,
	String nickname
) {

	@Builder
	public NeighborRequestResponseDto(Long neighborId, String memberId, String nickname){
		this.neighborId = neighborId;
		this.memberId = memberId;
		this.nickname = nickname;
	}
}
