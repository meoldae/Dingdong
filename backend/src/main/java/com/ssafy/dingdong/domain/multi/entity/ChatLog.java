package com.ssafy.dingdong.domain.multi.entity;

import com.ssafy.dingdong.domain.multi.dto.request.UserSession;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Document
@AllArgsConstructor
@Builder
public class ChatLog {
    @Id
    private String id;
    private LocalDate date;
    private LocalDateTime timestamp;
    private Long roomId;
    private String nickname;
    private String chat;

    public static ChatLog build(UserSession userSession) {
        return ChatLog.builder()
                .date(LocalDate.now())
                .timestamp(LocalDateTime.now())
                .roomId(userSession.getRoomId())
                .nickname(userSession.getNickname())
                .chat(userSession.getChat())
                .build();
    }
}