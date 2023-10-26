package com.ssafy.dingdong.domain.room.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.dingdong.domain.room.entity.RoomHeart;

public interface RoomHeartRepository extends JpaRepository<RoomHeart, Long> {

	Optional<RoomHeart> findByMemberIdAndRoomId(String memberId, Long roomId);
}
