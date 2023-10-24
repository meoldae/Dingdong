package com.ssafy.dingdong.domain.avatar.controller;

import com.ssafy.dingdong.domain.avatar.dto.response.AvatarListResponseDto;
import com.ssafy.dingdong.domain.avatar.service.AvatarService;
import com.ssafy.dingdong.global.response.DataResponse;
import com.ssafy.dingdong.global.response.ResponseService;
import com.ssafy.dingdong.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/avatar")
@RequiredArgsConstructor
public class AvatarControllerImpl implements AvatarSwagger{
    private final AvatarService avatarService;
    private final ResponseService responseService;
    @Override
    @GetMapping("/list")
    public DataResponse getListAvatar() {
        List<AvatarListResponseDto> result = avatarService.getListAvatar();
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, result);
    }
}
