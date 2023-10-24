package com.ssafy.dingdong.domain.member.repository;

import java.util.Optional;

import com.ssafy.dingdong.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

	Optional<Member> findByMemberId(String memberId);

	Optional<Member> findByEmail(String email);
}
