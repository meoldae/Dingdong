package com.ssafy.dingdong.domain.neighbor.dto.response;

import java.util.UUID;

import lombok.Builder;

public record NeighborResponse(
	UUID memberId,
	String nickname,
	Long avatarId,
	String isActive
) {
	@Builder
	public NeighborResponse(UUID memberId, String nickname, Long avatarId, String isActive){
		this.memberId = memberId;
		this.isActive = isActive;
		this.nickname = nickname;
		this.avatarId = avatarId;
	}
}
