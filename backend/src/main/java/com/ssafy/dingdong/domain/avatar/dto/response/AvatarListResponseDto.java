package com.ssafy.dingdong.domain.avatar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
@Builder
public class AvatarListResponseDto {
    private Map<Long, String> avatarList;
}
