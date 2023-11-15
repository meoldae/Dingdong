package com.ssafy.dingdong.domain.multi.repository;

import com.ssafy.dingdong.domain.multi.dto.request.JoinOutRequest;
import com.ssafy.dingdong.domain.multi.dto.request.UserSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Log4j2
@Repository
@RequiredArgsConstructor
public class MultiRepository {

    private final RedisTemplate<String, Map<String, Object>> multiUserTemplate;
    private final RedisTemplate<String, Object> redisTemplate;
    private ValueOperations<String, Object> valueOperations;
    private HashOperations<String, String, Object> hashOperations;
    private final String CHANNEL_PREFIX = "channel:";

    @PostConstruct
    public void init() {
        valueOperations = redisTemplate.opsForValue();
        hashOperations = multiUserTemplate.opsForHash();
    }

    public void saveUser(JoinOutRequest request) {
        String key = request.getRoomId().toString();
        String channelKey = CHANNEL_PREFIX + request.getChannelId().toString();

        Map<String, String> userProperties = new HashMap<>();
        userProperties.put("channelId", request.getChannelId().toString());
        userProperties.put("nickname", request.getNickname());
        userProperties.put("avatarId", request.getAvatarId().toString());
        userProperties.put("roomId", request.getRoomId().toString());
        userProperties.put("actionId", request.getActionId().toString());
        userProperties.put("chat", request.getChat());
        userProperties.put("x", String.valueOf(request.getX()));
        userProperties.put("y", String.valueOf(request.getY()));
        userProperties.put("z", String.valueOf(request.getZ()));

        hashOperations.put(channelKey, key, userProperties);
    }

    public void updateUser(UserSession userSession) {
        String key = userSession.getRoomId().toString();
        String channelKey = CHANNEL_PREFIX + userSession.getChannelId().toString();

        Map<String, String> userProperties = new HashMap<>();
        userProperties.put("channelId", userSession.getChannelId().toString());
        userProperties.put("nickname", userSession.getNickname());
        userProperties.put("avatarId", userSession.getAvatarId().toString());
        userProperties.put("roomId", userSession.getRoomId().toString());
        userProperties.put("actionId", userSession.getActionId().toString());
        userProperties.put("chat", userSession.getChat());
        userProperties.put("x", String.valueOf(userSession.getX()));
        userProperties.put("y", String.valueOf(userSession.getY()));
        userProperties.put("z", String.valueOf(userSession.getZ()));

        hashOperations.put(channelKey, key, userProperties);
    }

    public void deleteUser(JoinOutRequest request) {
        String channelKey = CHANNEL_PREFIX + request.getChannelId().toString();
        hashOperations.delete(channelKey, request.getRoomId().toString());
    }

    public Map<String, Object> findMultiUserList(String channelNo) {
        return hashOperations.entries(CHANNEL_PREFIX + channelNo);
    }

    public void updateAction(UserSession userSession) {
        String key = userSession.getRoomId().toString();
        String channelKey = CHANNEL_PREFIX + userSession.getChannelId().toString();

        Map<String, String> userProperties = new HashMap<>();
        userProperties.put("channelId", userSession.getChannelId().toString());
        userProperties.put("nickname", userSession.getNickname());
        userProperties.put("avatarId", userSession.getAvatarId().toString());
        userProperties.put("roomId", userSession.getRoomId().toString());
        userProperties.put("actionId", userSession.getActionId().toString());
        userProperties.put("x", String.valueOf(userSession.getX()));
        userProperties.put("y", String.valueOf(userSession.getY()));
        userProperties.put("z", String.valueOf(userSession.getZ()));

        hashOperations.put(channelKey, key, userProperties);
    }
}
