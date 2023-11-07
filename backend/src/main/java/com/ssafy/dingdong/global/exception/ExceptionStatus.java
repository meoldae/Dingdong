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
	AUTHENTICATION_FAILED(ResponseStatusCode.ERROR, "인증에 실패하였습니다."),
	TOKEN_EXPIRED(ResponseStatusCode.ERROR, "토큰이 만료되었습니다."),
	REFRESH_TOKEN_NOT_FOUND_IN_COOKIE(ResponseStatusCode.ERROR, "리프레시 토큰이 없습니다."),
	REFRESH_TOKEN_EXPIRED(ResponseStatusCode.ERROR, "리프레시 토큰이 만료되었습니다."),
	LOGOUT(ResponseStatusCode.ERROR, "로그아웃 되었습니다."),
	NEIGHBOR_REQUEST_ALREADY_EXIST(ResponseStatusCode.ERROR, "이미 요청을 보냈습니다."),
	NEIGHBOR_REQUEST_DOES_NOT_EXIST(ResponseStatusCode.ERROR, "요청이 존재하지 않습니다."),
	NEIGHBOR_ALREADY_CONNECTED(ResponseStatusCode.ERROR, "이미 이웃입니다."),
	NEIGHBOR_NOT_FOUND(ResponseStatusCode.ERROR, "이웃이 아닙니다."),
	ROOM_NOT_FOUND(ResponseStatusCode.ERROR, "방을 찾을 수 없습니다."),
	FURNITURE_NOT_FOUND(ResponseStatusCode.ERROR, "가구가 존재하지 않습니다."),
	ALL_ROOM_HEARTS_ARE_ZERO(ResponseStatusCode.ERROR, "스코어가 존재하지 않습니다."),
	VISITORBOOK_NOT_FOUND(ResponseStatusCode.ERROR, "해당 방명록을 찾을 수 없습니다."),
	//신고
	LETTER_FROM_NOT_FOUND(ResponseStatusCode.ERROR, "편지 작성자가 존재하지 않습니다."),
	CHAT_FROM_NOT_FOUND(ResponseStatusCode.ERROR, "채팅 작성자가 존재하지 않습니다.");

	private final ResponseStatusCode code;
	private final String message;
}
