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
	NOT_FOUND_STAMP(ResponseStatusCode.ERROR, "존재하지 않는 우표입니다"),
	FAILED_ENCRYPT_LETTER(ResponseStatusCode.ERROR, "편지 암호화에 실패했습니다."),
	FAILED_DECRYPT_LETTER(ResponseStatusCode.ERROR, "편지 복호화에 실패했습니다"),
	MEMBER_NOT_FOUND(ResponseStatusCode.ERROR, "회원을 찾을 수 없습니다."),
	TOKEN_EXPIRED(ResponseStatusCode.ERROR, "토큰이 만료되었습니다."),
	REFRESH_TOKEN_NOT_FOUND_IN_COOKIE(ResponseStatusCode.ERROR, "리프레시 토큰이 없습니다."),
	REFRESH_TOKEN_EXPIRED(ResponseStatusCode.ERROR, "리프레시 토큰이 만료되었습니다.");

	private final ResponseStatusCode code;
	private final String message;
}
