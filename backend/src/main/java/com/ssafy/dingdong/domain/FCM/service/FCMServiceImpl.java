package com.ssafy.dingdong.domain.FCM.service;

import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.WebpushConfig;
import com.google.firebase.messaging.WebpushNotification;
import com.ssafy.dingdong.domain.FCM.dto.request.FCMTokenDto;
import com.ssafy.dingdong.domain.FCM.repository.FCMRedisRepository;
import com.ssafy.dingdong.domain.member.service.MemberService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class FCMServiceImpl implements FCMService {

	private final FCMRedisRepository fcmRedisRepository;
	private final MemberService memberService;
	private final static String[] titles = {"딩동! 편지왔어요", "딩동! 놀러왔어요"};
	private final static String[] contents = {"님이 편지를 보냈어요!", "님이 이웃 맺기를 원해요!"};


	@Override
	public void saveFCMToken(FCMTokenDto fcmTokenDto, String memberId) {
		fcmRedisRepository.saveFCMToken(fcmTokenDto.getToken(), memberId);
	}

	@Override
	public void deleteFCMToken(String memberId) {
		fcmRedisRepository.deleteFCMToken(memberId);
	}

	@Override
	public String send(String senderId, String targetId, int flag) {

		String nickname = memberService.getMemberById(senderId).nickname();
		String fcmToken = fcmRedisRepository.findFCMTokenByMemberId(targetId).orElse("NOT");

		String response = null;
		Message message = null;
		if (!fcmToken.equals("NOT")) {
			message = Message.builder()
				.setToken(fcmToken)
				.setWebpushConfig(WebpushConfig.builder().putHeader("ttl", "300")
					.setNotification(
						new WebpushNotification(
							titles[flag],
							nickname + contents[flag])).build()
				).build();
		}
		if (message != null) {
			try {
				response = FirebaseMessaging.getInstance().sendAsync(message).get();
			} catch (InterruptedException | ExecutionException e) {
				throw new RuntimeException(e);
			}
		}
		return response;
	}
}
