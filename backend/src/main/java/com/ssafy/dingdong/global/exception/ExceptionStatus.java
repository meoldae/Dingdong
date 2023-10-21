package com.ssafy.dingdong.global.exception;

import com.ssafy.dingdong.global.response.ResponseStatusCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionStatus {

	/* 예시 */
	EXCEPTION(ResponseStatusCode.ERROR, "예외가 발생하였습니다.");

	private final ResponseStatusCode code;
	private final String message;
}
