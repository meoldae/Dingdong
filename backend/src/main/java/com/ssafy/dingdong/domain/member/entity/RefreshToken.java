package com.ssafy.dingdong.domain.member.entity;

import javax.persistence.Id;

import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "refreshToken")
public class RefreshToken {

	@Id
	private String memberId;
}
