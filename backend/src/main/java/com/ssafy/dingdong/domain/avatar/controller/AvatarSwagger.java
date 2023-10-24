package com.ssafy.dingdong.domain.avatar.controller;

import com.ssafy.dingdong.global.response.DataResponse;
import org.springframework.security.core.Authentication;

public interface AvatarSwagger {
    DataResponse getListAvatar();
}
