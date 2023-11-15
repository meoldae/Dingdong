package com.ssafy.dingdong.global.oauth.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AttributesKey {
	NAVER_SUB_ATTRIBUTES_KEY("response"),
	KAKAO_SUB_ATTRIBUTES_KEY("kakao_account"),
	KAKAO_OTHER_ATTRIBUTES_KEY("profile");

	public final String key;
}
