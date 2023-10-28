package com.ssafy.dingdong.domain.score.repository;

import com.ssafy.dingdong.domain.score.entity.Score;
import com.ssafy.dingdong.domain.score.enums.ScoreType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {

    @Query("SELECT s FROM Score s WHERE s.type = ?1 ORDER BY s.recordTime DESC")
    List<Score> findLatestByType(ScoreType type, Pageable pageable);

    @Query("SELECT MAX(s.recordTime) FROM Score s")
    Optional<LocalDateTime> findLatestRecordTime();

}
