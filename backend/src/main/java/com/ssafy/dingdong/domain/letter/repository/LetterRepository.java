package com.ssafy.dingdong.domain.letter.repository;

import com.ssafy.dingdong.domain.letter.dto.response.LetterResponseDto;
import com.ssafy.dingdong.domain.letter.entity.Letter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LetterRepository extends JpaRepository<Letter, Long> {
    Optional<List<LetterResponseDto>> findAllByLetterTo(String memberId);
}
