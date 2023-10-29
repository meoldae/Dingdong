package com.ssafy.dingdong.domain.member.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.ssafy.dingdong.domain.member.dto.response.MemberLoginResponseDto;
import com.ssafy.dingdong.domain.room.service.RoomService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.dingdong.domain.member.dto.request.MemberSignUpDto;
import com.ssafy.dingdong.domain.member.dto.response.MemberMainDto;
import com.ssafy.dingdong.domain.member.entity.Member;
import com.ssafy.dingdong.domain.member.repository.MemberRedisRepository;
import com.ssafy.dingdong.domain.member.repository.MemberRepository;
import com.ssafy.dingdong.global.exception.CustomException;
import com.ssafy.dingdong.global.exception.ExceptionStatus;
import com.ssafy.dingdong.global.util.JwtProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

	private final MemberRepository memberRepository;
	private final MemberRedisRepository memberRedisRepository;
	private final RoomService roomService;
	private final JwtProvider jwtProvider;
	private static Long maxCCUCount = 0L;

	@Override
	@Transactional
	public MemberLoginResponseDto createMember(MemberSignUpDto memberLoginDto) {
		Member findMember = memberRepository.findByMemberId(UUID.fromString(memberLoginDto.memberId())).orElseThrow(
			() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		findMember.signUp(memberLoginDto.nickname(), memberLoginDto.avatarId());
		String accessToken = jwtProvider.createAccessToken(findMember);

		Long roomId = roomService.createRoom(memberLoginDto.memberId());
		return MemberLoginResponseDto.of(findMember, roomId, accessToken);
	}

	@Override
	public MemberMainDto getMemberById(String memberId) {
		Member findMember = memberRepository.findByMemberId(UUID.fromString(memberId)).orElseThrow(
			() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		return MemberMainDto.of(findMember);
	}

	@Override
	public MemberMainDto getMemberByNickname(String nickname) {
		Member findMember = memberRepository.findByNickname(nickname).orElseThrow(
			() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		return MemberMainDto.of(findMember);
	}


	@Override
	public List<MemberMainDto> getMemberListLikeNickname(String nickname) {
		List<Member> memberList = memberRepository.findAllLikeNickname(nickname);
		List<MemberMainDto> resultList = new ArrayList<>();

		memberList.stream().forEach(
			member -> {
				MemberMainDto memberDto = MemberMainDto.of(member);
				resultList.add(memberDto);
			}
		);
		return resultList;
	}

	@Override
	public MemberLoginResponseDto getLoginMember(String memberId) {
		Member findMember = memberRepository.findByMemberId(UUID.fromString(memberId)).orElseThrow(
			() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		Long roomId = roomService.getRoomIdByMemberId(memberId);
		return MemberLoginResponseDto.of(findMember, roomId, "");
	}

	@Override
	public void createSession(String memberId) {
		memberRedisRepository.insertStatusByMemberId(memberId);
		Long ccuCount = memberRedisRepository.getCCUCount();
		maxCCUCount = Math.max(maxCCUCount, ccuCount);
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
	@Transactional
	public void logout(String memberId) {
		// 세션 비활성화
		deleteSession(memberId);
		memberRedisRepository.deleteTokenByMemberId(memberId);
	}

	@Override
	@Transactional
	public void deleteMember(String memberId) {
		logout(memberId);
		Member findMember = memberRepository.findByMemberId(UUID.fromString(memberId)).orElseThrow(
			() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
		);
		findMember.exit();
	}

	@Override
	public boolean isMemberByNickname(String nickname) {
		log.info("nickname {} , ", nickname);
		return !memberRepository.findByNickname(nickname).isPresent();
	}

	@Override
	public Long getMaxCCUCount(){
		Long ccuCount = memberRedisRepository.getCCUCount();
		maxCCUCount = 0L;
		return ccuCount;
	}

}
