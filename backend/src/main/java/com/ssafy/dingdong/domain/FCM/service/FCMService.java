package com.ssafy.dingdong.domain.FCM.service;

import java.util.List;

import com.ssafy.dingdong.domain.FCM.dto.request.FCMTokenDto;
import com.ssafy.dingdong.domain.letter.entity.Letter;

public interface FCMService {
	void saveFCMToken(FCMTokenDto fcmTokenDto, String memberId);

	void deleteFCMToken(String memberId);

	String send(String senderId, String targetId, int flag);

	void sendAll(String targetId, List<Letter> letters, int flag);
}
