package com.ssafy.dingdong.domain.member.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRedisRepository extends CrudRepository<String, String> {

	void saveToken(String memberId, String accessToken, String refreshToken);
}
