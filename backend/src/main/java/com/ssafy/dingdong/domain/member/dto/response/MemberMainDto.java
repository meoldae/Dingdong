package com.ssafy.dingdong.domain.member.dto.response;

import com.ssafy.dingdong.domain.member.entity.Member;

import lombok.Builder;

public record MemberMainDto(
	String memberId,
	String nickname,
	Long characterId
){
	@Builder
	public MemberMainDto(String memberId, String nickname, Long characterId){
		this.memberId = memberId;
		this.nickname = nickname;
		this.characterId = characterId;
	}
	public static MemberMainDto of(Member member){
		return MemberMainDto.builder()
			.memberId(member.getMemberId().toString())
			.nickname(member.getNickname())
			.characterId(member.getCharacterId())
			.build();

	}

}
