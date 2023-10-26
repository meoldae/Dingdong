package com.ssafy.dingdong.domain.room.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomHeart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long roomHeartId;
	private Long roomId;
	private String memberId;
	private LocalDateTime createTime;

	@Builder
	public RoomHeart(Long roomHeartId, Long roomId, String memberId) {
		this.roomHeartId = roomHeartId;
		this.roomId = roomId;
		this.memberId = memberId;
		this.createTime = LocalDateTime.now();
	}

	public void updateStatus(){
		if (this.createTime != null) this.createTime = null;
		else this.createTime = LocalDateTime.now();
	}
}