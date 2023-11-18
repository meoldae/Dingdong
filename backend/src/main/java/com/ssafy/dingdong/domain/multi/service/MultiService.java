package com.ssafy.dingdong.domain.multi.service;


import com.ssafy.dingdong.domain.multi.dto.request.UserSession;

import java.util.Map;

public interface MultiService {
    Map<String, Object> getMultiUser(String channelId);

    void saveChat(UserSession userSession);
}
