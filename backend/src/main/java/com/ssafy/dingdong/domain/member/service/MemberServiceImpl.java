package com.ssafy.dingdong.domain.member.service;

import java.util.UUID;

import com.ssafy.dingdong.domain.room.service.RoomService;
import org.springframework.stereotype.Service;

import com.ssafy.dingdong.domain.member.dto.request.MemberSignUpDto;
import com.ssafy.dingdong.domain.member.dto.response.MemberMainDto;
import com.ssafy.dingdong.domain.member.entity.Member;
import com.ssafy.dingdong.domain.member.repository.MemberRedisRepository;
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
	private final MemberRedisRepository memberRedisRepository;
	private final RoomService roomService;

	@Override
	public MemberMainDto createMember(MemberSignUpDto memberLoginDto) {
		Member findMember = memberRepository.findByMemberId(UUID.fromString(memberLoginDto.memberId())).orElseThrow(
			() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		findMember.signUp(memberLoginDto.nickname(), memberLoginDto.avatarId());

		roomService.createRoom(memberLoginDto.memberId());
		return MemberMainDto.of(findMember);
	}

	@Override
	public MemberMainDto getMemberById(String memberId) {
		Member findMember = memberRepository.findByMemberId(UUID.fromString(memberId)).orElseThrow(
			() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		return MemberMainDto.of(findMember);
	}

	@Override
	public void createSession(String memberId) {
		memberRedisRepository.insertStatusByMemberId(memberId);
	}

	@Override
	public void deleteSession(String memberId) {
		memberRedisRepository.deleteStatusByMemberId(memberId);
	}

	@Override
	public String getStatusByMemberId(String memberId){
		return memberRedisRepository.findStatusByMemberId(memberId).orElse("FALSE");
	}

	@Override
	public void login(String memberId, String accessToken, String refreshToken) {
		memberRedisRepository.saveToken(memberId, accessToken, refreshToken);
	}

	@Override
	public void logout(String memberId) {
		// 세션 비활성화
		deleteSession(memberId);
		memberRedisRepository.deleteTokenByMemberId(memberId);
	}
}
