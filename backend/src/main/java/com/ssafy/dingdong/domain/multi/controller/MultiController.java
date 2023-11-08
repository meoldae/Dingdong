package com.ssafy.dingdong.domain.multi.controller;

import com.ssafy.dingdong.domain.multi.dto.request.MoveRequest;
import com.ssafy.dingdong.domain.multi.dto.request.UserSession;
import com.ssafy.dingdong.domain.multi.repository.MultiRepository;
import com.ssafy.dingdong.domain.multi.service.MultiService;
import com.ssafy.dingdong.global.response.DataResponse;
import com.ssafy.dingdong.global.response.ResponseService;
import com.ssafy.dingdong.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Log4j2
@RestController
@RequiredArgsConstructor
public class MultiController {

    private final SimpMessagingTemplate messagingTemplate;
    private final MultiRepository multiRepository;
    private final MultiService multiService;
    private final ResponseService responseService;
    @MessageMapping("/move/{channelId}")
    public void moveCharacter(@DestinationVariable Long channelId, MoveRequest request) {
        log.info("request={}", request);
        messagingTemplate.convertAndSend("/sub/move/" + channelId, request);
    }

    @MessageMapping("/join/{channelId}")
    public void joinChannel(@DestinationVariable Long channelId, UserSession userSession) {
        log.info("join OK={}", userSession);
        // Redis에 사용자 정보를 저장
        multiRepository.saveUser(userSession);

        // 새로운 사용자 정보를 해당 채널의 모든 사용자에게 알림
        messagingTemplate.convertAndSend("/sub/channel/" + channelId, userSession);
    }

    @MessageMapping("/out/{channelId}")
    public void outChannel(@DestinationVariable Long channelId, UserSession userSession) {
        log.info("OUT OK={}", userSession);
        // Redis에 사용자 정보를 저장
        multiRepository.deleteUser(userSession);
    }

    @GetMapping("/multi/{channelId}")
    public DataResponse getMultiUsers(Authentication authentication,
                                      @PathVariable String channelId) {
        Map<String, Object> userList = multiRepository.findMultiUserList(channelId);
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, userList);
    }
}
