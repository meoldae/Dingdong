package com.ssafy.dingdong.domain.avatar.controller;

import com.ssafy.dingdong.domain.avatar.dto.response.AvatarListResponseDto;
import com.ssafy.dingdong.global.response.DataResponse;
import org.springframework.security.core.Authentication;

public interface AvatarSwagger {
    DataResponse<AvatarListResponseDto> getListAvatar();
}
