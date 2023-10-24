package com.ssafy.dingdong.domain.member.service;

import com.ssafy.dingdong.domain.member.dto.request.MemberSignUpDto;
import com.ssafy.dingdong.domain.member.dto.response.MemberMainDto;

public interface MemberService {

	MemberMainDto createMember(MemberSignUpDto memberLoginDto);

	MemberMainDto getMemberById(String memberId);

	void createSession(String memberId);

	void deleteSession(String memberId);

	String getStatusByMemberId(String memberId);

	void login(String memberId, String accessToken, String refreshToken);

	void logout(String memberId);

	void deleteMember(String memberId);
}
