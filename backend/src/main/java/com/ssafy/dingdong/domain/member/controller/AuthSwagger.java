package com.ssafy.dingdong.domain.member.controller;

import javax.servlet.http.HttpServletRequest;

import com.ssafy.dingdong.global.response.DataResponse;

import io.swagger.annotations.Api;

@Api(tags = "Auth")
public interface AuthSwagger {

	DataResponse<String> refresh(HttpServletRequest request);
}
