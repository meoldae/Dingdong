package com.ssafy.dingdong.domain.cs.repository;

import com.ssafy.dingdong.domain.cs.entity.Cs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CsRepository extends JpaRepository<Cs, Long> {

}
