package com.ssafy.dingdong.domain.multi.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ActionRequest {
    private Long channelId;
    private Long roomId;
    private Integer actionId;
}
