package com.ssafy.dingdong.domain.room.service;

import com.ssafy.dingdong.domain.room.entity.Room;
import com.ssafy.dingdong.domain.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService{

    private final RoomRepository roomRepository;

    @Override
    public void createRoom(String memberId) {
        Room room = Room.builder()
                .memberId(memberId)
                .glbUrl("s3 default room url")
                .build();

        roomRepository.save(room);
    }
}
