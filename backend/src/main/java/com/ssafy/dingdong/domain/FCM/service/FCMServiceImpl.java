package com.ssafy.dingdong.domain.FCM.service;

import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.WebpushConfig;
import com.google.firebase.messaging.WebpushNotification;
import com.ssafy.dingdong.domain.FCM.dto.request.FCMTokenDto;
import com.ssafy.dingdong.domain.FCM.repository.FCMRedisRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class FCMServiceImpl implements FCMService {

	private final FCMRedisRepository fcmRedisRepository;

	@Override
	public void saveFCMToken(FCMTokenDto fcmTokenDto, String memberId) {
		fcmRedisRepository.saveFCMToken(fcmTokenDto.getToken(), memberId);
	}

	@Override
	public void deleteFCMToken(String memberId) {

	}

	@Override
	public String send(String targetId, String title, String content) {
		String fcmToken = fcmRedisRepository.findFCMTokenByMemberId(targetId).orElse("NOT");

		Message message = Message.builder()
			.setToken(fcmToken)
			.setWebpushConfig(WebpushConfig.builder().putHeader("ttl", "300")
				.setNotification(
					new WebpushNotification(
						title,
						content)).build()
			).build();

		String response = null;

		try {
			response = FirebaseMessaging.getInstance().sendAsync(message).get();
		} catch (InterruptedException | ExecutionException e) {
			throw new RuntimeException(e);
		}
		return response;
	}
}
