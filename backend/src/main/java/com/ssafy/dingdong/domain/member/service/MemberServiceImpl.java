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

	@Override
	public void createSession(String memberId) {
		/**
		 * Todo : Redis 활성화 세션 관리 로직
		 */
	}

	@Override
	public void deleteSession(String memberId) {
		/**
		 * Todo : Redis 세션 비활성화 로직
		 */
	}

	@Override
	public void logout(String memberId) {
		// 세션 비활성화
		deleteSession(memberId);

		/**
		 * Todo : Redis 중복 로그인 처리를 위한 토큰 제거
		 */

	}
}
