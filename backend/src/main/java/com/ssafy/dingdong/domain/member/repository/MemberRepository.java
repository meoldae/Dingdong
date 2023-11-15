package com.ssafy.dingdong.domain.member.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.ssafy.dingdong.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

	Optional<Member> findByMemberId(UUID memberId);

	Optional<Member> findByEmail(String email);

	@Query("SELECT m.nickname"
		 + "  FROM Member m"
		 + " WHERE m.memberId = :memberId ")
	Optional<String> getNicknameByMemberId(@Param("memberId") UUID memberId);

	@Query("SELECT m "
		 + "  FROM Member m "
		 + " WHERE m.nickname = :nickname ")
	Optional<Member> findByNickname(@Param("nickname") String nickname);

	@Query("SELECT m "
		+ "  FROM Member m "
		+ " WHERE m.nickname LIKE concat('%', :nickname, '%') ")
	List<Member> findAllLikeNickname(@Param("nickname") String nickname);
}
