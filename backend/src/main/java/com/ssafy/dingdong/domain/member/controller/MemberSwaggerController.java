package com.ssafy.dingdong.domain.member.controller;

import javax.servlet.http.HttpServletRequest;
import javax.xml.crypto.Data;

import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.dingdong.domain.member.dto.request.MemberSignUpDto;
import com.ssafy.dingdong.domain.member.dto.response.MemberMainDto;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;

@RestController
@RequestMapping("/member")
public interface MemberSwaggerController {

	@PostMapping("/signup")
	DataResponse<MemberMainDto> createMember(@Validated @RequestBody MemberSignUpDto memberLoginDto, HttpServletRequest response);

	@DeleteMapping("/logout")
	CommonResponse logout(Authentication authentication);

	@GetMapping
	DataResponse<MemberMainDto> getMember(@Validated @PathVariable String memberId);

	@GetMapping("/connect")
	CommonResponse createSession(Authentication authentication);

	@DeleteMapping("/disconnect")
	CommonResponse deleteSession(Authentication authentication);
}
