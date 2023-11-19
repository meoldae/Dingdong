package com.ssafy.dingdong.domain.multi.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ActionResponse {
    private Long channelId;
    private Long roomId;
    private Integer actionId;
    private Integer diceNumber;

    public ActionResponse(Long channelId, Long roomId, Integer actionId) {
        this.channelId = channelId;
        this.roomId = roomId;
        this.actionId = actionId;
        this.diceNumber = (int) (Math.random()*6) + 1;
    }
}
