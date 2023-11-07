package com.ssafy.dingdong.domain.multi.repository;

import com.ssafy.dingdong.domain.multi.dto.request.UserSession;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Repository
@RequiredArgsConstructor
public class MultiRepository {

    private final StringRedisTemplate stringRedisTemplate;

    public void saveUser(UserSession userSession) {
        String key = "user:" + userSession.getNickname();
        Map<String, String> userProperties = new HashMap<>();
        userProperties.put("channelId", userSession.getChannelId().toString());
        userProperties.put("roomId", userSession.getRoomId().toString());
        userProperties.put("x", String.valueOf(userSession.getX()));
        userProperties.put("y", String.valueOf(userSession.getY()));
        userProperties.put("z", String.valueOf(userSession.getZ()));

        stringRedisTemplate.opsForHash().putAll(key, userProperties);
//        stringRedisTemplate.opsForSet().add("room:" + userSession.getRoomId(), userSession.getNickname());
    }

    public void updateUserPosition(String nickname, double x, double y, double z) {
        String key = "user:" + nickname;
        stringRedisTemplate.opsForHash().put(key, "x", String.valueOf(x));
        stringRedisTemplate.opsForHash().put(key, "y", String.valueOf(y));
        stringRedisTemplate.opsForHash().put(key, "z", String.valueOf(z));
    }

    // 특정 채널에 있는 모든 사용자의 정보를 가져오는 메서드
    public Map<String, UserSession> getUsersInChannel(Long channelId) {
        Map<String, UserSession> usersInChannel = new HashMap<>();
        // 채널의 모든 사용자 닉네임을 가져옴
        Set<String> nicknames = stringRedisTemplate.opsForSet().members("channel:" + channelId);

        if (nicknames != null) {
            for (String nickname : nicknames) {
                Map<Object, Object> userProperties = stringRedisTemplate.opsForHash().entries("user:" + nickname);
                if (userProperties != null && !userProperties.isEmpty()) {
                    // UserSession 객체를 생성하여 Map에 추가
                    UserSession userSession = new UserSession(
                            Integer.valueOf((String) userProperties.get("channelId")),
                            nickname,
                            Long.valueOf((String) userProperties.get("roomId")),
                            Double.valueOf((String) userProperties.get("x")),
                            Double.valueOf((String) userProperties.get("y")),
                            Double.valueOf((String) userProperties.get("z"))
                    );
                    usersInChannel.put(nickname, userSession);
                }
            }
        }

        return usersInChannel;
    }
}
