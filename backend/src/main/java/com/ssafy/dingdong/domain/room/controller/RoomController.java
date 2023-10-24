package com.ssafy.dingdong.domain.room.controller;

import com.ssafy.dingdong.global.response.CommonResponse;
import org.springframework.security.core.Authentication;

public class RoomController implements RoomSwagger{
    @Override
    public CommonResponse authGetRoom(Authentication authentication) {
        return null;
    }

    @Override
    public CommonResponse guestGetRoom() {
        return null;
    }
}
