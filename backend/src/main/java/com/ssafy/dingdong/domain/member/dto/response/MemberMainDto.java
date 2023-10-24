package com.ssafy.dingdong.domain.member.dto.response;

import com.ssafy.dingdong.domain.member.entity.Member;

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

}
