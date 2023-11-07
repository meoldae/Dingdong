package com.ssafy.dingdong.domain.multi.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserSession {
    private Integer channelId;
    private String nickname;

    private Long roomId;
    private double x;
    private double y;
    private double z;

}