package com.ssafy.dingdong.domain.multi.controller;

import com.ssafy.dingdong.domain.multi.dto.request.MoveRequest;
import com.ssafy.dingdong.domain.multi.dto.request.UserSession;
import com.ssafy.dingdong.domain.multi.repository.MultiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MultiController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MultiRepository multiRepository;

    @MessageMapping("/move/{channelId}")
    public void moveCharacter(@DestinationVariable Long channelId, MoveRequest request) {
        messagingTemplate.convertAndSend("/sub/move/" + channelId, request);
    }

    @MessageMapping("/join/{channelId}")
    public void joinChannel(@DestinationVariable Long channelId, UserSession userSession) {
        // Redis에 사용자 정보를 저장
        multiRepository.saveUser(userSession);

        // 새로운 사용자 정보를 해당 채널의 모든 사용자에게 알림
        messagingTemplate.convertAndSend("/sub/channel/" + channelId, userSession);

        // 현재 채널에 있는 모든 사용자의 정보를 새로운 사용자에게 보냄
        Map<String, UserSession> usersInChannel = multiRepository.getUsersInChannel(channelId);
        messagingTemplate.convertAndSendToUser(userSession.getNickname(), "/queue/channel/" + channelId, usersInChannel.values());
    }
}
