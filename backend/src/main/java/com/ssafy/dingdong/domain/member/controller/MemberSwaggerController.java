package com.ssafy.dingdong.domain.member.controller;

import com.ssafy.dingdong.domain.member.dto.request.MemberSignUpDto;
import com.ssafy.dingdong.domain.member.dto.response.MemberMainDto;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

public interface MemberSwaggerController {

	DataResponse<MemberMainDto> createMember(@Validated @RequestBody MemberSignUpDto memberSignUpDto, HttpServletRequest response);

	CommonResponse logout(Authentication authentication);

	DataResponse<MemberMainDto> getMember(@PathVariable String memberId);

	CommonResponse createSession(Authentication authentication);

	CommonResponse deleteSession(Authentication authentication);
}
