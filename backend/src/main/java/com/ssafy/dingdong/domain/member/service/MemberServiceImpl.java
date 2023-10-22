package com.ssafy.dingdong.domain.member.service;

import org.springframework.stereotype.Service;

import com.ssafy.dingdong.domain.member.dto.request.MemberSignUpDto;
import com.ssafy.dingdong.domain.member.dto.response.MemberMainDto;
import com.ssafy.dingdong.domain.member.dto.response.MemberResponseDto;
import com.ssafy.dingdong.domain.member.entity.Member;
import com.ssafy.dingdong.domain.member.repository.MemberRepository;
import com.ssafy.dingdong.global.exception.CustomException;
import com.ssafy.dingdong.global.exception.ExceptionStatus;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;

	@Override
	public MemberMainDto createMember(MemberSignUpDto memberLoginDto) {
		Member findMember = memberRepository.findById(memberLoginDto.memberId()).orElseThrow(
			() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		findMember.signUp(memberLoginDto.nickname(), memberLoginDto.characterId());
		return MemberMainDto.of(findMember);
	}

	@Override
	public MemberMainDto getMemberById(String memberId) {
		Member findMember = memberRepository.findById(memberId).orElseThrow(
			() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		return MemberMainDto.of(findMember);
	}
}
