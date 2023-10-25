package com.ssafy.dingdong.domain.room.service;

import com.ssafy.dingdong.domain.room.dto.response.RoomResponseDto;
import com.ssafy.dingdong.domain.room.entity.Room;
import com.ssafy.dingdong.domain.room.repository.FurnitureRepository;
import com.ssafy.dingdong.domain.room.repository.RoomRepository;
import com.ssafy.dingdong.global.exception.CustomException;
import com.ssafy.dingdong.global.exception.ExceptionStatus;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService{

    private final RoomRepository roomRepository;
    private final FurnitureRepository furnitureRepository;

    @Override
    @Transactional
    public RoomResponseDto getRoomByMemberId(String memberId) {
        Room findRoom = roomRepository.findByMemberId(memberId).orElseThrow(
            () -> new CustomException(ExceptionStatus.ROOM_NOT_FOUND)
        );
        return findRoom.toRoomResponseDto();
    }

    @Override
    @Transactional
    public RoomResponseDto getRoomByRoomId(Long roomId) {
        Room findRoom = roomRepository.findByRoomId(roomId).orElseThrow(
            () -> new CustomException(ExceptionStatus.ROOM_NOT_FOUND)
        );
        return findRoom.toRoomResponseDto();
    }

    @Override
    public void createRoom(String memberId) {
        Room room = Room.builder()
                .memberId(memberId)
                .build();
        roomRepository.save(room);
    }


}
