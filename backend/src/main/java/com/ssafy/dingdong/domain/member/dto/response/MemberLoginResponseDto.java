package com.ssafy.dingdong.domain.member.dto.response;

import java.util.UUID;

import com.ssafy.dingdong.domain.member.entity.Member;
import com.ssafy.dingdong.domain.neighbor.dto.response.NeighborResponse;

import lombok.Builder;

public record MemberLoginResponseDto(
	String memberId,
	String nickname,
	Long avatarId,
	String accessToken
){
	@Builder
	public MemberLoginResponseDto(String memberId, String nickname, Long avatarId, String accessToken){
		this.memberId = memberId;
		this.nickname = nickname;
		this.avatarId = avatarId;
		this.accessToken = accessToken;
	}
	public static MemberLoginResponseDto of(Member member, String accessToken){
		return MemberLoginResponseDto.builder()
			.memberId(member.getMemberId().toString())
			.nickname(member.getNickname())
			.avatarId(member.getAvatarId())
			.accessToken(accessToken)
			.build();
	}
}
