package com.ssafy.dingdong.domain.room.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RoomScoreDto{
	private Long roomId;
	private String memberId;
	private String nickname;
	private Long heartCount;

	@Builder
	public RoomScoreDto(Long roomId, Long heartCount){
		this.roomId = roomId;
		this.heartCount = heartCount;
	}

	public void setNickname(String nickname){
		this.nickname = nickname;
	}

	public void setMemberId(String memberId){
		this.memberId = memberId;
	}
}
