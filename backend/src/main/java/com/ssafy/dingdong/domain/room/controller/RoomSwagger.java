package com.ssafy.dingdong.domain.room.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.ssafy.dingdong.domain.room.dto.request.RoomUpdateRequestDto;
import com.ssafy.dingdong.domain.room.dto.response.FurnitureDetailDto;
import com.ssafy.dingdong.domain.room.dto.response.FurnitureSummaryDto;
import com.ssafy.dingdong.domain.room.dto.response.RoomResponseDto;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;

import io.swagger.annotations.Api;

@Api(tags = "Room", description = "방 꾸미기 API")
public interface RoomSwagger {

	DataResponse<RoomResponseDto> getMyRoom(Authentication authentication);

	DataResponse<RoomResponseDto> getRoomByMemberId(@PathVariable String roomId);

	DataResponse<RoomResponseDto> getRoomByRoomId(@PathVariable Long roomId);

	DataResponse<Page<FurnitureSummaryDto>> getFurnitureList(@RequestParam(required = false) Integer category, @PageableDefault(size = 6) Pageable pageable);

	DataResponse<FurnitureDetailDto> getFurnitureByFurnitureId(@PathVariable String furnitureId);

	CommonResponse updateRoom(@RequestBody RoomUpdateRequestDto roomUpdateRequestDto, Authentication authentication);

	CommonResponse roomHeart(@PathVariable Long roomId, Authentication authentication);
}
