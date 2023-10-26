package com.ssafy.dingdong.domain.room.dto.request;

import java.util.List;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomUpdateRequestDto {
	private Long roomId;
	private List<UpdateFurnitureDto> updateFurnitureList;
}
