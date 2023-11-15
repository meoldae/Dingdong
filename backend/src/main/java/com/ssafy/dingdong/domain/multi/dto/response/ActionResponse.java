package com.ssafy.dingdong.domain.multi.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ActionResponse {
    private Long channelId;
    private Long roomId;
    private Integer actionId;
}
