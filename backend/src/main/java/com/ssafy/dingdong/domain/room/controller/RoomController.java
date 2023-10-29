package com.ssafy.dingdong.domain.room.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.dingdong.domain.room.dto.request.RoomUpdateRequestDto;
import com.ssafy.dingdong.domain.room.dto.response.FurnitureDetailDto;
import com.ssafy.dingdong.domain.room.dto.response.FurnitureSummaryDto;
import com.ssafy.dingdong.domain.room.dto.response.RoomResponseDto;
import com.ssafy.dingdong.domain.room.dto.response.RoomScoreDto;
import com.ssafy.dingdong.domain.room.service.RoomService;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;
import com.ssafy.dingdong.global.response.ResponseService;
import com.ssafy.dingdong.global.response.ResponseStatus;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/room")
@RequiredArgsConstructor
public class RoomController implements RoomSwagger{

    private final RoomService roomService;
    private final ResponseService responseService;

    @Override
    @GetMapping
    public DataResponse<RoomResponseDto> getMyRoom(Authentication authentication) {
        RoomResponseDto findRoom = roomService.getRoomByMemberId(authentication.getName());
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, findRoom);
    }

    @Override
    @GetMapping("/{memberId}")
    public DataResponse<RoomResponseDto> getRoomByMemberId(@PathVariable String memberId) {
        RoomResponseDto findRoom = roomService.getRoomByMemberId(memberId);
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, findRoom);
    }


    @Override
    @GetMapping("/roomId/{roomId}")
    public DataResponse<RoomResponseDto> getRoomByRoomId(@PathVariable Long roomId) {
        RoomResponseDto findRoom = roomService.getRoomByRoomId(roomId);
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, findRoom);
    }

    @Override
    @GetMapping("/furniture")
    public DataResponse<Page<FurnitureSummaryDto> > getFurnitureList(@RequestParam Integer category, @PageableDefault(size = 6) Pageable pageable) {
        Page<FurnitureSummaryDto>furnitureList = roomService.getFurnitureListByCategory(category, pageable);
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, furnitureList);
    }

    @Override
    @GetMapping("/furniture/{furnitureId}")
    public DataResponse<FurnitureDetailDto> getFurnitureByFurnitureId(@PathVariable String furnitureId) {
        FurnitureDetailDto furniture = roomService.getFurnitureByFurnitureId(furnitureId);
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, furniture);
    }

    @Override
    @PostMapping
    public CommonResponse updateRoom(@RequestBody RoomUpdateRequestDto roomUpdateRequestDto, Authentication authentication) {
        roomService.updateRoom(roomUpdateRequestDto, authentication.getName());
        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }

    @Override
    @GetMapping("/heart/{roomId}")
    public DataResponse<String> isRoomHeart(@PathVariable Long roomId, Authentication authentication){
        String heartRoomInfo = roomService.isHeartRoom(authentication.getName(), roomId);
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, heartRoomInfo);
    }

    @Override
    @PostMapping("/heart/{roomId}")
    public DataResponse<String> roomHeart(@PathVariable Long roomId, Authentication authentication) {
        String heartRoomInfo = roomService.createHeartRoom(authentication.getName(), roomId);
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, heartRoomInfo);
    }

    @Override
    @GetMapping("/heart/score")
    public DataResponse<List<RoomScoreDto>> getRoomScore(){
        List<RoomScoreDto> roomScore = roomService.getRoomScore();
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, roomScore);
    }
}
