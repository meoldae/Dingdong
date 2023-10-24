package com.ssafy.dingdong.domain.member.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.ssafy.dingdong.domain.member.dto.request.MemberSignUpDto;
import com.ssafy.dingdong.domain.member.dto.response.MemberMainDto;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;

import io.swagger.annotations.Api;

@Api(tags = "Member")
public interface MemberSwagger {

	DataResponse<MemberMainDto> createMember(@Validated @RequestBody MemberSignUpDto memberSignUpDto, HttpServletRequest response);

	CommonResponse logout(Authentication authentication);

	DataResponse<MemberMainDto> getMember(@PathVariable String memberId);

	DataResponse<MemberMainDto> getMember(Authentication authentication);

	CommonResponse createSession(Authentication authentication);

	CommonResponse deleteSession(Authentication authentication);

	CommonResponse deleteMember(Authentication authentication);
}
