package com.ssafy.dingdong.domain.member.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.dingdong.domain.member.dto.request.MemberSignUpDto;
import com.ssafy.dingdong.domain.member.dto.response.MemberResponseDto;
import com.ssafy.dingdong.global.response.DataResponse;

@RestController
@RequestMapping("/member")
public interface MemberSwaggerController {

	@PostMapping("/signup")
	DataResponse<MemberResponseDto> createMember(@RequestBody MemberSignUpDto memberLoginDto, HttpServletRequest response);
}
