package com.ssafy.dingdong.domain.member.repository;

import javax.annotation.PostConstruct;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MemberRedisRepository {

	private final String ACCESS_TOKEN = "accessToken";
	private final String REFRESH_TOKEN = "refreshToken";

	private final RedisTemplate<String, Object> redisTemplate;
	private ValueOperations<String, Object> valueOperations;

	@PostConstruct
	public void init(){
		valueOperations = redisTemplate.opsForValue();
	}

	public void saveToken(String memberId, String accessToken, String refreshToken) {
		valueOperations.set(ACCESS_TOKEN + memberId, accessToken);
		valueOperations.set(REFRESH_TOKEN + memberId, refreshToken);
	}
}
