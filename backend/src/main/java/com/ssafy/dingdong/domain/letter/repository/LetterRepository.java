package com.ssafy.dingdong.domain.letter.repository;

import com.ssafy.dingdong.domain.letter.entity.Letter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LetterRepository extends JpaRepository<Letter, Long> {
}
