package com.ssafy.dingdong.domain.room.dto.request;

import java.util.List;

import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RoomUpdateRequestDto {
	private Long roomId;
	private List<UpdateFurnitureDto> updateFurnitureList;
	@Length(max = 7)
	private String lightColor;
	@Length(max = 7)
	private String wallColor;

}
