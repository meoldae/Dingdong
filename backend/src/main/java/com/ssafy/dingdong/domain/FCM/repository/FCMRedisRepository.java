package com.ssafy.dingdong.domain.FCM.repository;

import java.util.Optional;

import javax.annotation.PostConstruct;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Repository
@RequiredArgsConstructor
public class FCMRedisRepository {

	private final RedisTemplate<String, Object> redisTemplate;
	private HashOperations<String, String, String> hashOperations;
	private final String FCM_TOKEN = "fcm_token";

	@PostConstruct
	public void init() {
		hashOperations = redisTemplate.opsForHash();
	}

	public void saveFCMToken(String fcmToken, String memberId) {
		hashOperations.put(FCM_TOKEN, memberId, fcmToken);
	}

	public void deleteFCMToken(String memberId) {
		hashOperations.delete(FCM_TOKEN, memberId);
	}

	public Optional<String> findFCMTokenByMemberId(String memberId) {
		return Optional.ofNullable(hashOperations.get(FCM_TOKEN, memberId));
	}

}
