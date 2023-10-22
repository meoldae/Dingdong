package com.ssafy.dingdong.domain.member.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.dingdong.domain.member.dto.request.MemberSignUpDto;
import com.ssafy.dingdong.domain.member.dto.response.MemberMainDto;
import com.ssafy.dingdong.domain.member.service.MemberService;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;
import com.ssafy.dingdong.global.response.ResponseService;
import com.ssafy.dingdong.global.response.ResponseStatus;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequiredArgsConstructor
public class MemberController implements MemberSwaggerController {

	private final ResponseService responseService;
	private final MemberService memberService;

	@Override
	public DataResponse createMember(@Validated @RequestBody MemberSignUpDto memberLoginDto, HttpServletRequest response) {
		MemberMainDto member = memberService.createMember(memberLoginDto);
		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, member);
	}

	@Override
	public CommonResponse logout(Authentication authentication) {
		memberService.logout(authentication.getName());
		return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
	}

	@Override
	public DataResponse getMember(@Validated @PathVariable String memberId) {
		MemberMainDto member = memberService.getMemberById(memberId);
		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, member);
	}

	@Override
	public CommonResponse createSession(Authentication authentication) {
		memberService.createSession(authentication.getName());
		return responseService.successResponse(ResponseStatus.SESSION_CREATED);
	}

	@Override
	public CommonResponse deleteSession(Authentication authentication) {
		memberService.deleteSession(authentication.getName());
		return responseService.successResponse(ResponseStatus.SESSION_DELETED);
	}
}
