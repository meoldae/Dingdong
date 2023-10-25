package com.ssafy.dingdong.domain.room.repository;

import com.ssafy.dingdong.domain.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {

}
