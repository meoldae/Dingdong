package com.ssafy.dingdong.domain.multi.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;


@Getter
@AllArgsConstructor
public class ChatLog {
    private Long roomId;
    private String nickname;
    private String chat;
    private LocalDateTime timestamp;
}