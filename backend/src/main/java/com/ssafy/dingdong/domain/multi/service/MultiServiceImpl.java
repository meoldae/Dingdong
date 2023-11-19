package com.ssafy.dingdong.domain.multi.service;

import com.ssafy.dingdong.domain.multi.dto.request.UserSession;
import com.ssafy.dingdong.domain.multi.entity.ChannelChatLogs;
import com.ssafy.dingdong.domain.multi.entity.ChatLog;
import com.ssafy.dingdong.domain.multi.entity.DailyChatLogs;
import com.ssafy.dingdong.domain.multi.mongorepo.ChatLogRepository;
import com.ssafy.dingdong.domain.multi.repository.MultiRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Map;

@Log4j2
@Service
@RequiredArgsConstructor
public class MultiServiceImpl implements MultiService {

    private final MultiRepository multiRepository;
    private final ChatLogRepository chatLogRepository;
    @Override
    public Map<String, Object> getMultiUser(String channelId) {
        return multiRepository.findMultiUserList(channelId);
    }

    @Override
    public void saveChat(UserSession userSession) {
        String today = LocalDate.now().toString(); // 오늘 날짜 구하기
        DailyChatLogs dailyChatLogs = chatLogRepository.findByDate(today) // 오늘 날짜의 로그 검색
                .orElse(new DailyChatLogs(today, new ArrayList<>())); // 없으면 새 객체 생성

        // 채널에 맞는 로그 리스트 찾기 또는 생성하기
        ChannelChatLogs channelLogs = dailyChatLogs.getChannels().stream()
                .filter(c -> c.getChannelId().equals(userSession.getChannelId()))
                .findFirst()
                .orElseGet(() -> {
                    ChannelChatLogs newChannelLogs = new ChannelChatLogs(userSession.getChannelId(), new ArrayList<>());
                    dailyChatLogs.getChannels().add(newChannelLogs);
                    return newChannelLogs;
                });

        // 채팅 로그 추가
        ChatLog newChatLog = new ChatLog(userSession.getRoomId(), userSession.getNickname(), userSession.getChat(), LocalDateTime.now());
        channelLogs.getChatLogs().add(newChatLog);

        // 업데이트된 객체 저장
        chatLogRepository.save(dailyChatLogs);
    }
}
