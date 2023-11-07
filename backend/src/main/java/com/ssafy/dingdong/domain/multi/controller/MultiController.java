package com.ssafy.dingdong.domain.multi.controller;

import com.ssafy.dingdong.domain.multi.dto.request.MoveRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MultiController {

    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/move/{channelId}")
    public void moveCharacter(@DestinationVariable Long channelId, MoveRequest request) {
        messagingTemplate.convertAndSend("/topic/move/" + channelId, request);
    }


}
