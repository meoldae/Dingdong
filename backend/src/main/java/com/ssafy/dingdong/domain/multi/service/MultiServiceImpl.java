package com.ssafy.dingdong.domain.multi.service;

import com.ssafy.dingdong.domain.multi.repository.MultiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class MultiServiceImpl implements MultiService {

    private final MultiRepository multiRepository;
    @Override
    public Map<String, Object> getMultiUser(String channelId) {
        return multiRepository.findMultiUserList(channelId);
    }
}
