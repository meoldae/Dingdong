package com.ssafy.dingdong.domain.letter.repository;


import com.ssafy.dingdong.domain.letter.dto.response.LetterSNSResponseDto;
import com.ssafy.dingdong.domain.letter.entity.LetterSNS;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface LetterSNSRepository extends JpaRepository<LetterSNS, String> {

    @Query("SELECT new com.ssafy.dingdong.domain.letter.dto.response.LetterSNSResponseDto(" +
            "l.roomId, l.letterTo, l.description, l.letterFrom, s.imgUrl) " +
            "FROM LetterSNS l " +
            "JOIN Stamp s ON l.stampId = s.id " +
            "WHERE l.letterId = :letterId")
    Optional<LetterSNSResponseDto> findByLetterId(@Param("letterId") String letterId);
}
