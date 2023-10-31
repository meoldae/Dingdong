package com.ssafy.dingdong.domain.member.service;

import java.util.List;

import com.ssafy.dingdong.domain.member.dto.request.MemberSignUpDto;
import com.ssafy.dingdong.domain.member.dto.response.MemberLoginResponseDto;
import com.ssafy.dingdong.domain.member.dto.response.MemberMainDto;

public interface MemberService {

	MemberLoginResponseDto createMember(MemberSignUpDto memberLoginDto);

	MemberMainDto getMemberById(String memberId);

	MemberMainDto getMemberByNickname(String nickname);

	void createSession(String memberId);

	void deleteSession(String memberId);

	boolean getStatusByMemberId(String memberId);

	void login(String memberId, String accessToken, String refreshToken);

	void logout(String memberId);

	void deleteMember(String memberId);

	boolean isMemberByNickname(String nickname);

	Long getMaxCCUCount();

	List<MemberMainDto> getMemberListLikeNickname(String nickname);

	MemberLoginResponseDto getLoginMember(String memberId);
}
