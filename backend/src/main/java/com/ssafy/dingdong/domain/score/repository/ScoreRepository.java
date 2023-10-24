package com.ssafy.dingdong.domain.score.repository;

import com.ssafy.dingdong.domain.score.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScoreRepository extends JpaRepository<Score, Long> {
}
