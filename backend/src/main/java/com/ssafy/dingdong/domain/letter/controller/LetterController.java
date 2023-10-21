package com.ssafy.dingdong.domain.letter.controller;

import com.ssafy.dingdong.domain.letter.entity.Letter;
import com.ssafy.dingdong.domain.letter.service.LetterService;
import com.ssafy.dingdong.global.response.DataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/letter")
@RequiredArgsConstructor
public class LetterController implements LetterSwagger {

    private final LetterService letterService;

    @Override
    public DataResponse getLetterList(Authentication authentication) {
        String memberId = authentication.getName();
        letterService.getLetterList(memberId);
    }
}

