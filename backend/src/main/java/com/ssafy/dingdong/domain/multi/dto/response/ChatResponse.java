package com.ssafy.dingdong.domain.multi.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatResponse {
    private Long channelId;
    private Long roomId;
    private String message;
}
