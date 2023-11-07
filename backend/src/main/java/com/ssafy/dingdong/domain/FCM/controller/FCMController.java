package com.ssafy.dingdong.domain.FCM.controller;

import java.util.concurrent.ExecutionException;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.dingdong.domain.FCM.dto.request.FCMTokenDto;
import com.ssafy.dingdong.domain.FCM.service.FCMService;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.ResponseService;
import com.ssafy.dingdong.global.response.ResponseStatus;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("/fcm")
@RequiredArgsConstructor
public class FCMController implements FCMSwagger {

	private final FCMService fcmService;
	private final ResponseService responseService;

	@Override
	@PostMapping("/login")
	public CommonResponse saveFCMToken(@RequestBody FCMTokenDto fcmTokenDto, Authentication authentication) {
		fcmService.saveFCMToken(fcmTokenDto, authentication.getName().toString());
		return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
	}

	@Override
	@DeleteMapping("/logout")
	public CommonResponse deleteFCMToken(Authentication authentication) {
		fcmService.deleteFCMToken(authentication.getName().toString());
		return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
	}
}
