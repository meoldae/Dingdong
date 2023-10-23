package com.ssafy.dingdong.domain.member.service;

public interface AuthService {

	String refresh(String accessToken, String value);

}
