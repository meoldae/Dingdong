package com.ssafy.dingdong.global.exception;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.dingdong.global.response.CommonResponse;

@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.setStatus(401);
		ObjectMapper objectMapper = new ObjectMapper();

		CommonResponse commonResponse = new CommonResponse();
		commonResponse.setCode(ExceptionStatus.AUTHENTICATION_FAILED.getCode().getCode());
		commonResponse.setMessage(ExceptionStatus.AUTHENTICATION_FAILED.getMessage());
		objectMapper.writeValue(response.getWriter(), commonResponse);
	}
}