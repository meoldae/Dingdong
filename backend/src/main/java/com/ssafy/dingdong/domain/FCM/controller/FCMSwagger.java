package com.ssafy.dingdong.domain.FCM.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;

import com.ssafy.dingdong.domain.FCM.dto.request.FCMTokenDto;
import com.ssafy.dingdong.global.response.CommonResponse;

public interface FCMSwagger {

	CommonResponse saveFCMToken(@RequestBody FCMTokenDto fcmTokenDto, Authentication authentication);

	CommonResponse deleteFCMToken(Authentication authentication);

}
