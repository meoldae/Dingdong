package com.ssafy.dingdong.domain.member.service;

import com.ssafy.dingdong.domain.member.dto.request.MemberSignUpDto;
import com.ssafy.dingdong.domain.member.dto.response.MemberMainDto;

public interface MemberService {

	MemberMainDto createMember(MemberSignUpDto memberLoginDto);
}
