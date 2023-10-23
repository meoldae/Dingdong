package com.ssafy.dingdong.global.exception;

import com.ssafy.dingdong.global.response.ResponseStatusCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionStatus {

	/* 예시 */
	EXCEPTION(ResponseStatusCode.ERROR, "예외가 발생하였습니다."),
	LETTER_FOUND_EXCEPTION(ResponseStatusCode.ERROR, "편지 목록 조회 중 문제가 발생했습니다"),
	LETTER_NOT_FOUND(ResponseStatusCode.ERROR, "편지를 찾을 수 없습니다."),
	MEMBER_NOT_FOUND(ResponseStatusCode.ERROR, "회원을 찾을 수 없습니다."),
	TOKEN_EXPIRED(ResponseStatusCode.ERROR, "토큰이 만료되었습니다.");

	private final ResponseStatusCode code;
	private final String message;
}
