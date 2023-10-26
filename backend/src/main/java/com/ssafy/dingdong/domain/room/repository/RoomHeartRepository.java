package com.ssafy.dingdong.domain.room.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ssafy.dingdong.domain.room.entity.RoomHeart;

public interface RoomHeartRepository extends JpaRepository<RoomHeart, Long> {

	Optional<RoomHeart> findByMemberIdAndRoomId(String memberId, Long roomId);

	@Query("SELECT count(*) "
		 + "  FROM RoomHeart rh "
		 + " WHERE rh.roomId = :roomId "
		 + "   AND rh.createTime IS NOT NULL")
	Long getCountByRoomId(Long roomId);
}
