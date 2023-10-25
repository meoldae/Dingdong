package com.ssafy.dingdong.domain.room.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.dingdong.domain.room.entity.Furniture;

@Repository
public interface FurnitureRepository extends JpaRepository<Furniture, Long> {

}
