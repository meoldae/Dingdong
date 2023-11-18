package com.ssafy.dingdong.domain.multi.service;

import com.ssafy.dingdong.domain.multi.dto.request.UserSession;
import com.ssafy.dingdong.domain.multi.entity.ChatLog;
import com.ssafy.dingdong.domain.multi.mongorepo.ChatLogRepository;
import com.ssafy.dingdong.domain.multi.repository.MultiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

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
        ChatLog log = ChatLog.build(userSession);
        chatLogRepository.save(log);
    }
}
