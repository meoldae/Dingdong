package com.ssafy.dingdong.domain.letter.repository;

import com.ssafy.dingdong.domain.letter.dto.response.LetterResponseDto;
import com.ssafy.dingdong.domain.letter.entity.Letter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LetterRepository extends JpaRepository<Letter, Long> {

    @Query("SELECT new com.ssafy.dingdong.domain.letter.dto.response.LetterResponseDto( " +
            "l.anonymousFlag, l.description, mf.nickname, mt.nickname, s.imgUrl, s.description, l.createTime) " +
            "FROM Letter l " +
            "JOIN Member mf ON l.letterFrom = mf.memberId " +
            "JOIN Member mt ON l.letterTo = mt.memberId " +
            "JOIN Stamp s ON l.stamp.id = s.id " +
            "WHERE l.letterTo = :memberId")
    Page<LetterResponseDto> findAllByLetterTo(@Param("memberId") String memberId, Pageable pageable);
}
