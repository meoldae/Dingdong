package com.ssafy.dingdong.domain.member.controller;

import javax.servlet.http.HttpServletRequest;

import com.ssafy.dingdong.global.response.DataResponse;

public interface AuthSwagger {

	DataResponse refresh(HttpServletRequest request);
}
