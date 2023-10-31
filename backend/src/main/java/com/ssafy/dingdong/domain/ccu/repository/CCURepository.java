package com.ssafy.dingdong.domain.ccu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.dingdong.domain.ccu.entity.CCU;

@Repository
public interface CCURepository extends JpaRepository<CCU, Long> {

}
