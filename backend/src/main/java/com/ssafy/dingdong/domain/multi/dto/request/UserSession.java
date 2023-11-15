package com.ssafy.dingdong.domain.multi.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSession {
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