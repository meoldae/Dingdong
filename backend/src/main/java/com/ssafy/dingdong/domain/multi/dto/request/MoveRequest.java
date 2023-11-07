package com.ssafy.dingdong.domain.multi.dto.request;

import lombok.Data;

@Data
public class MoveRequest {
    private Integer channelId;
    private String uuid; // 회원을 식별..

    private Long actionId; // 추후 상호작용을 위하여
    private double x;
    private double y;
    private double z;
}
