package com.ssafy.dingdong.domain.member.controller;

import com.ssafy.dingdong.domain.member.dto.request.MemberSignUpDto;
import com.ssafy.dingdong.domain.member.dto.response.MemberMainDto;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/member")
public interface MemberSwaggerController {

	@PostMapping("/signup")
	DataResponse<MemberMainDto> createMember(@Validated @RequestBody MemberSignUpDto memberSignUpDto, HttpServletRequest response);

	@DeleteMapping("/logout")
	CommonResponse logout(Authentication authentication);

	@GetMapping("/{memberId}")
	DataResponse<MemberMainDto> getMember(@PathVariable String memberId);

	@GetMapping("/connect")
	CommonResponse createSession(Authentication authentication);

	@DeleteMapping("/disconnect")
	CommonResponse deleteSession(Authentication authentication);
}
