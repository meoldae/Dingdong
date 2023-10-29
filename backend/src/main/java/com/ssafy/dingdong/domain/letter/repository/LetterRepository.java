package com.ssafy.dingdong.domain.letter.repository;

import com.ssafy.dingdong.domain.letter.dto.response.LetterListResponseDto;
import com.ssafy.dingdong.domain.letter.dto.response.LetterResponseDto;
import com.ssafy.dingdong.domain.letter.dto.response.LetterScoreDto;
import com.ssafy.dingdong.domain.letter.entity.Letter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface LetterRepository extends JpaRepository<Letter, Long> {

    Page<LetterListResponseDto> findAllByLetterToAndIsReportFalse(@Param("memberId") String memberId, Pageable pageable);

    @Query("SELECT new com.ssafy.dingdong.domain.letter.dto.response.LetterResponseDto( " +
            "l.anonymousFlag, l.description, mf.nickname, mt.nickname, s.imgUrl, s.description, l.createTime) " +
            "FROM Letter l " +
            "JOIN Member mf ON l.letterFrom = mf.memberId " +
            "JOIN Member mt ON l.letterTo = mt.memberId " +
            "JOIN Stamp s ON l.stamp.id = s.id " +
            "WHERE l.letterTo = :memberId AND l.id = :letterId")
    Optional<LetterResponseDto> findByLetterId(@Param("memberId") String memberId, @Param("letterId") Long letterId);

    @Query("SELECT l.letterFrom FROM Letter l WHERE l.id = :letterId")
    Optional<String> findLetterFromByLetterId(@Param("letterId") Long letterId);

    @Query("SELECT new com.ssafy.dingdong.domain.letter.dto.response.LetterScoreDto(l.letterFrom, count(l.letterFrom)) " +
            "FROM Letter l " +
            "GROUP BY l.letterFrom " +
            "ORDER BY count(l.letterFrom) DESC")
    Page<LetterScoreDto> getLetterFromScore(Pageable pageable);

    @Query("SELECT new com.ssafy.dingdong.domain.letter.dto.response.LetterScoreDto(l.letterTo, count(l.letterTo)) " +
            "FROM Letter l " +
            "GROUP BY l.letterTo " +
            "ORDER BY count(l.letterTo) DESC")
    Page<LetterScoreDto> getLetterToScore(Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE Letter l SET l.isRead = true WHERE l.id = :letterId")
    void updateIsReadById(@Param("letterId") Long letterId);

    @Modifying
    @Transactional
    @Query("UPDATE Letter l SET l.isReport = true WHERE l.id = :letterId")
    void updateIsReportById(@Param("letterId") Long letterId);
}
