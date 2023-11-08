package com.ssafy.dingdong.domain.multi.dto.request;

import lombok.Data;

@Data
public class MoveRequest {
    private Integer channelId;
    private String nickname;

    private Long roomId;
    private double x;
    private double y;
    private double z;
}
