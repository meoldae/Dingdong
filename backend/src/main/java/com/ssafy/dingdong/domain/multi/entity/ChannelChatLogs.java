package com.ssafy.dingdong.domain.multi.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ChannelChatLogs {
    private Integer channelId; // 채팅 채널 ID 또는 이름
    private List<ChatLog> chatLogs; // 해당 채널의 채팅 로그 리스트
}
