package com.ssafy.dingdong.global.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ResponseStatus {
    /* 공통 */
    RESPONSE_SUCCESS(ResponseStatusCode.SUCCESS, "요청에 성공했습니다.");

    private final ResponseStatusCode code;
    private final String message;
}
