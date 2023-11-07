package com.ssafy.dingdong.domain.FCM.dto.request;

import lombok.Getter;

@Getter
public class FCMTokenDto{
	private String token;

	public FCMTokenDto(String token){
		this.token = token;
	}
}
