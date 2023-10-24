package com.ssafy.dingdong.domain.member.repository;

import java.time.Duration;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class MemberRedisRepository {

	private final String ACCESS_TOKEN = "accessToken:";
	private final String REFRESH_TOKEN = "refreshToken:";

	private final RedisTemplate<String, Object> redisTemplate;
	private ValueOperations<String, Object> valueOperations;

	Duration accessTokenExpiration;
	Duration refreshTokenExpiration;

	@PostConstruct
	public void init() {
		valueOperations = redisTemplate.opsForValue();
		// accessTokenExpiration = Duration.ofMinutes(30); // 30분
		accessTokenExpiration = Duration.ofDays(1); // 테스트용 하루
		refreshTokenExpiration = Duration.ofDays(7); // 1주일
	}

	public void saveToken(String memberId, String accessToken, String refreshToken) {
		valueOperations.set(ACCESS_TOKEN + memberId, accessToken, accessTokenExpiration);
		valueOperations.set(REFRESH_TOKEN + memberId, refreshToken, refreshTokenExpiration);
	}

	public void renewalAccessToken(String memberId, String newAccessToken) {
		valueOperations.set(ACCESS_TOKEN + memberId, newAccessToken, accessTokenExpiration);
	}

	public void deleteTokenByMemberId(String memberId) {
		valueOperations.getAndDelete(ACCESS_TOKEN + memberId);
		valueOperations.getAndDelete(REFRESH_TOKEN + memberId);

	}

	public Optional<Object> findAccessTokenByMemberId(String memberId) {
		return Optional.ofNullable(valueOperations.get(ACCESS_TOKEN + memberId));
	}
}
