package com.ssafy.dingdong.domain.member.repository;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MemberRedisRepository {

	private final RedisTemplate<String, Object> redisTemplate;

	public void saveToken(String memberId, String accessToken, String refreshToken) {

	}
}
