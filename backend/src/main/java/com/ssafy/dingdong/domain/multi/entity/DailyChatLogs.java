package com.ssafy.dingdong.domain.multi.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
@AllArgsConstructor
@Getter
public class DailyChatLogs {

    @Id
    private String date;
    private List<ChannelChatLogs> channels;
}
