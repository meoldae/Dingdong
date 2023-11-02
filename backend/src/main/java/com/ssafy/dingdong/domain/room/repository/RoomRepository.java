package com.ssafy.dingdong.domain.room.repository;

import java.util.Optional;

import com.ssafy.dingdong.domain.room.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

	Optional<Room> findByMemberId(String memberId);

	Optional<Room> findByRoomId(Long roomId);

	@Query(value = "SELECT room_id FROM room WHERE member_id != :memberId ORDER BY RAND() DESC LIMIT 1", nativeQuery = true)
	Optional<Long> getRandomRoomId(@Param("memberId") String memberId);
}
