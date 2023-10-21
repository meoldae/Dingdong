package com.ssafy.dingdong.global.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ResponseStatusCode {
	SUCCESS("SUCCESS"),
	FAILED("FAILED"),
	ERROR("ERROR");

	private final String code;
}
