package com.ssafy.dingdong.domain.member.dto.response;

import com.ssafy.dingdong.domain.member.entity.Member;

import lombok.Builder;

public record MemberLoginResponseDto(
	String memberId,
	String nickname,
	Long avatarId,
	Long roomId,
	String accessToken
){
	@Builder
	public MemberLoginResponseDto(String memberId, String nickname, Long avatarId, Long roomId, String accessToken){
		this.memberId = memberId;
		this.nickname = nickname;
		this.avatarId = avatarId;
		this.roomId = roomId;
		this.accessToken = accessToken;
	}

	public static MemberLoginResponseDto of(Member member, Long roomId, String accessToken){
		return MemberLoginResponseDto.builder()
			.memberId(member.getMemberId().toString())
			.nickname(member.getNickname())
			.avatarId(member.getAvatarId())
			.roomId(roomId)
			.accessToken(accessToken)
			.build();
	}
}
