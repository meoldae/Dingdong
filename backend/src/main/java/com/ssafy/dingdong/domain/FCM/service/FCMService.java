package com.ssafy.dingdong.domain.FCM.service;

import java.util.concurrent.ExecutionException;

import com.ssafy.dingdong.domain.FCM.dto.request.FCMTokenDto;

public interface FCMService {
	void saveFCMToken(FCMTokenDto fcmTokenDto, String memberId);

	void deleteFCMToken(String memberId);

	String send(String targetId, String title, String content);
}
