package com.ssafy.dingdong.domain.neighbor.dto.response;

import java.util.UUID;

import lombok.Builder;

public record NeighborResponse(
	UUID memberId,
	String nickname,
	Long avatarId,
	Long roomId,
	boolean isActive
) {
	@Builder
	public NeighborResponse(UUID memberId, String nickname, Long avatarId, Long roomId, boolean isActive){
		this.memberId = memberId;
		this.isActive = isActive;
		this.nickname = nickname;
		this.roomId = roomId;
		this.avatarId = avatarId;
	}
}
