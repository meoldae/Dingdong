package com.ssafy.dingdong.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionStatus {

	/* 예시 */
	EXCEPTION("-9999", "예외가 발생하였습니다."),
	TOKEN_EXPIRED("-1000", "토큰이 만료되었습니다."),
	REFRESH_TOKEN_EXPIRED("-1001", "토큰이 만료되었습니다."),
	TOKEN_NOT_FOUND_IN_COOKIE("-1002", "토큰이 없습니다.");

	private final String code;
	private final String message;
}
