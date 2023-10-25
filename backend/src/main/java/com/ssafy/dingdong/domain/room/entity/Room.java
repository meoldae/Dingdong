package com.ssafy.dingdong.domain.room.entity;

import java.util.List;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.ssafy.dingdong.domain.room.dto.response.RoomResponseDto;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;
    private String memberId;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "roomId")
    private List<Furniture> furnitureList;

    public RoomResponseDto toRoomResponseDto() {
        return RoomResponseDto.builder()
            .roomId(this.roomId)
            .furnitureList(this.furnitureList)
            .build();
    }
}
