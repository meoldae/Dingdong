package com.ssafy.dingdong.domain.room.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.dingdong.domain.room.dto.response.FurnitureSummaryDto;
import com.ssafy.dingdong.domain.room.dto.response.RoomResponseDto;
import com.ssafy.dingdong.domain.room.entity.Furniture;
import com.ssafy.dingdong.domain.room.service.RoomService;
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
    @GetMapping("/memberId/{memberId}")
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
    public DataResponse<List<FurnitureSummaryDto> > getFurnitureList(@RequestParam(required = false) Integer category, @PageableDefault(size = 6) Pageable pageable) {
        List<FurnitureSummaryDto>  furnitureList;

        if (category != null) {
            furnitureList = roomService.getFurnitureListByCategory(category);
        }else {
            furnitureList = roomService.getFurnitureList();
        }

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, furnitureList);
    }
}
