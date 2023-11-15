package com.ssafy.dingdong.domain.avatar.service;

import com.ssafy.dingdong.domain.avatar.dto.response.AvatarListResponseDto;
import com.ssafy.dingdong.domain.avatar.entity.Avatar;
import com.ssafy.dingdong.domain.avatar.repository.AvatarRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Log4j2
@Service
@RequiredArgsConstructor
public class AvatarServiceImpl implements AvatarService{
    private final AvatarRepository avatarRepository;

    @Override
    public AvatarListResponseDto getListAvatar() {
        List<Avatar> avatars = avatarRepository.findAll();

        Map<Long, String> avatarList = new HashMap<>();
        for (Avatar avatar : avatars) {
            avatarList.put(avatar.getAvatarId(), avatar.getThumbUrl());
        }

        return AvatarListResponseDto.builder()
                .avatarList(avatarList)
                .build();
    }
}
