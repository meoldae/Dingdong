package com.ssafy.dingdong.domain.letter.controller;

import com.ssafy.dingdong.domain.letter.dto.response.LetterResponseDto;
import com.ssafy.dingdong.domain.letter.entity.Letter;
import com.ssafy.dingdong.domain.letter.service.LetterService;
import com.ssafy.dingdong.global.response.DataResponse;
import com.ssafy.dingdong.global.response.ResponseService;
import com.ssafy.dingdong.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/letter")
@RequiredArgsConstructor
public class LetterController implements LetterSwagger {

    private final ResponseService responseService;
    private final LetterService letterService;

    @Override
    @GetMapping
    public DataResponse getLetterList(Authentication authentication,
                                      @PageableDefault(size = 20) Pageable pageable) {
//        String memberId = authentication.getName();
        log.info("OK");
        String memberId = "eb7c4309-5724-4ef6-9be2-d59b5b5675d8";
        Page<LetterResponseDto> result = letterService.getLetterList(memberId, pageable);

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, result);
    }
}

