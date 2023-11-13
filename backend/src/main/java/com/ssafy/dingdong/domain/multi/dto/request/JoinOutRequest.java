package com.ssafy.dingdong.domain.multi.dto.request;

import lombok.Data;

@Data
public class JoinOutRequest {
    private Integer status;
    private Integer channelId;
    private String nickname;

    private Long avatarId;
    private Long roomId;
    private Integer actionId;
    private String chat;
    private double x;
    private double y;
    private double z;
}
