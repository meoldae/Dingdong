package com.ssafy.dingdong.domain.member.controller;

import javax.servlet.http.HttpServletRequest;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.ssafy.dingdong.domain.member.dto.request.MemberSignUpDto;
import com.ssafy.dingdong.domain.member.dto.response.MemberLoginResponseDto;
import com.ssafy.dingdong.domain.member.dto.response.MemberMainDto;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;

import io.swagger.annotations.Api;

@Api(tags = "Member", description = "회원 API")
public interface MemberSwagger {

	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "요청에 성공했습니다."),
			@ApiResponse(responseCode = "400", description = "회원을 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = CommonResponse.class)))
			}
	)
	@Operation(summary = "로그아웃", description = "접속 상태를 비활성화하고 토큰을 모두 제거합니다.")
	CommonResponse logout(Authentication authentication);

	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "요청에 성공했습니다."),
			@ApiResponse(responseCode = "400", description = "예외가 발생하였습니다.")
	}
	)
	@Operation(summary = "닉네임 / 캐릭터 설정", description = "닉네임을 설정하고 캐릭터를 선택합니다.")
	DataResponse<MemberLoginResponseDto> createMember(@Parameter(name = "MemberSignUpDto", description = "회원 ID, 닉네임, 캐릭터 ID를 인자로 받습니다.") @Validated @RequestBody MemberSignUpDto memberSignUpDto, HttpServletRequest response);

	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "요청에 성공했습니다."),
			@ApiResponse(responseCode = "400", description = "회원을 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = CommonResponse.class)))
			}
	)
	@Operation(summary = "회원 정보 조회", description = "회원 ID를 통해 정보를 조회합니다.")
	DataResponse<MemberMainDto> getMemberByMemberId(@Parameter(name = "memberId", description = "회원 ID")@PathVariable String memberId);

	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "요청에 성공했습니다."),
			@ApiResponse(responseCode = "400", description = "회원을 찾을 수 없습니다.", content = @Content(schema = @Schema(implementation = CommonResponse.class)))
			}
	)
	@Operation(summary = "내 정보 조회", description = "AccessToken 을 통해 내 정보를 조회합니다.")
	DataResponse<MemberMainDto> getMember(Authentication authentication);

	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "요청에 성공했습니다."),
			@ApiResponse(responseCode = "400", description = "예외가 발생하였습니다.")
			}
	)
	@Operation(summary = "접속 상태 활성화", description = "접속 여부를 활성화합니다.")
	CommonResponse createSession(Authentication authentication);

	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "요청에 성공했습니다."),
			@ApiResponse(responseCode = "400", description = "예외가 발생하였습니다.")
			}
	)
	@Operation(summary = "접속 상태 비활성화", description = "접속 여부를 비활성화합니다.")
	CommonResponse deleteSession(Authentication authentication);

	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "요청에 성공했습니다."),
			@ApiResponse(responseCode = "400", description = "예외가 발생하였습니다.")
			}
	)
	@Operation(summary = "회원 탈퇴", description = "회원 정보를 논리적으로 삭제합니다.")
	CommonResponse deleteMember(Authentication authentication);

	@ApiResponses(value = {
		@ApiResponse(responseCode = "200", description = "요청에 성공했습니다."),
		@ApiResponse(responseCode = "400", description = "예외가 발생하였습니다.")
	}
	)
	@Operation(summary = "닉네임 중복 검사", description = "닉네임이 중복인지 검사합니다.")
	CommonResponse nicknameIsUnique(@PathVariable String nickname);
}
