package com.ssafy.dingdong.domain.room.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.dingdong.domain.room.entity.RoomFurniture;

@Repository
public interface RoomFurnitureRepository extends JpaRepository<RoomFurniture, Long> {

}
