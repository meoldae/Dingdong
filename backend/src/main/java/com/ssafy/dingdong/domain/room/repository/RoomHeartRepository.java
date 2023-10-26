package com.ssafy.dingdong.domain.room.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.dingdong.domain.room.dto.response.RoomScoreDto;
import com.ssafy.dingdong.domain.room.entity.RoomHeart;

public interface RoomHeartRepository extends JpaRepository<RoomHeart, Long> {

	Optional<RoomHeart> findByMemberIdAndRoomId(String memberId, Long roomId);

	@Query("SELECT count(*) "
		 + "  FROM RoomHeart rh "
		 + " WHERE rh.roomId = :roomId "
		 + "   AND rh.createTime IS NOT NULL")
	Long getCountByRoomId(@Param("roomId") Long roomId);

	@Query("SELECT new com.ssafy.dingdong.domain.room.dto.response.RoomScoreDto( "
		 + "rh.roomId, count(rh) )"
		 + "  FROM RoomHeart rh "
		 + " WHERE rh.createTime IS NOT NULL "
		 + " GROUP BY rh.roomId "
		 + " ORDER BY COUNT(rh) DESC ")
	Page<RoomScoreDto> getHeartRoomScore(Pageable pageable);
}
