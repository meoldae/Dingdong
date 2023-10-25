package com.ssafy.dingdong.domain.member.controller;

import javax.servlet.http.HttpServletRequest;

import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;

import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@Api(tags = "Auth", description = "인증 API")
public interface AuthSwagger {

	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "요청에 성공했습니다."),
			@ApiResponse(responseCode = "400", description = "예외가 발생하였습니다.", content = @Content(schema = @Schema(implementation = CommonResponse.class)))
			}
	)
	@Operation(summary = "토큰 리프레시", description = "리프레시 토큰을 통해 액세스 토큰을 재발급 받습니다.")
	DataResponse<String> refresh(HttpServletRequest request);
}
