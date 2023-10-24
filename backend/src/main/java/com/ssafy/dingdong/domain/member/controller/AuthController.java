package com.ssafy.dingdong.domain.member.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.dingdong.domain.member.service.AuthService;
import com.ssafy.dingdong.global.exception.CustomException;
import com.ssafy.dingdong.global.exception.ExceptionStatus;
import com.ssafy.dingdong.global.response.DataResponse;
import com.ssafy.dingdong.global.response.ResponseService;
import com.ssafy.dingdong.global.response.ResponseStatus;
import com.ssafy.dingdong.global.util.CookieUtils;
import com.ssafy.dingdong.global.util.JwtProvider;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController implements AuthSwagger{

	private static final String REFRESH_TOKEN = "refreshToken";
	private final JwtProvider jwtProvider;
	private final CookieUtils cookieUtils;
	private final AuthService authService;
	private final ResponseService responseService;

	@Override
	@PostMapping("/refresh")
	public DataResponse<String> refresh(HttpServletRequest request){
		String accessToken = jwtProvider.getAccessToken(request);
		Cookie cookie = cookieUtils.getCookie(request, REFRESH_TOKEN).orElseThrow(
			() -> new CustomException(ExceptionStatus.REFRESH_TOKEN_NOT_FOUND_IN_COOKIE)
		);

		String newAccessToken = authService.refresh(accessToken, cookie.getValue());

		return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, newAccessToken);
	}

}
