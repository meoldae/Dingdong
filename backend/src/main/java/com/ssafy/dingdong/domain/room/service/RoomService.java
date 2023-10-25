package com.ssafy.dingdong.domain.room.service;

import com.ssafy.dingdong.domain.room.dto.response.RoomResponseDto;

public interface RoomService {

    RoomResponseDto getRoomByMemberId(String memberId);

    RoomResponseDto getRoomByRoomId(Long roomId);

    void createRoom(String memberId);

}
