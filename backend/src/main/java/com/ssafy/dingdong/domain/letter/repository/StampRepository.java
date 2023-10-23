package com.ssafy.dingdong.domain.letter.repository;

import com.ssafy.dingdong.domain.letter.entity.Stamp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StampRepository extends JpaRepository<Stamp, Long> {
}
