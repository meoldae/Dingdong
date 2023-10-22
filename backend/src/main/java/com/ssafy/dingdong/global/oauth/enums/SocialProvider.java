package com.ssafy.dingdong.global.oauth.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SocialProvider {
	GOOGLE("google"),
	NAVER("naver"),
	KAKAO("kakao");

	private final String socialProvider;
}
