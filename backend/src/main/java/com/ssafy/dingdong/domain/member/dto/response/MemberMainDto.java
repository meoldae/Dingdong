package com.ssafy.dingdong.domain.member.dto.response;

import java.util.UUID;

import com.ssafy.dingdong.domain.member.entity.Member;
import com.ssafy.dingdong.domain.neighbor.dto.response.NeighborResponse;

import lombok.Builder;

public record MemberMainDto(
	String memberId,
	String nickname,
	Long avatarId
){
	@Builder
	public MemberMainDto(String memberId, String nickname, Long avatarId){
		this.memberId = memberId;
		this.nickname = nickname;
		this.avatarId = avatarId;
	}
	public static MemberMainDto of(Member member){
		return MemberMainDto.builder()
			.memberId(member.getMemberId().toString())
			.nickname(member.getNickname())
			.avatarId(member.getAvatarId())
			.build();
	}

	public NeighborResponse to(boolean status, Long roomId){
		return NeighborResponse.builder()
			.memberId(UUID.fromString(this.memberId))
			.nickname(this.nickname())
			.avatarId(this.avatarId())
			.roomId(roomId)
			.isActive(status)
			.build();
	}

}
