package com.ssafy.dingdong.domain.multi.dto.request;

import lombok.Data;

@Data
public class ActionRequest {

    private Long channelId;
    private Long roomId;

    private Integer actionId;
}
