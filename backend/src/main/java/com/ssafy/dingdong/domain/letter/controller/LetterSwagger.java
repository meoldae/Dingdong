package com.ssafy.dingdong.domain.letter.controller;

import com.ssafy.dingdong.domain.letter.dto.request.LetterAllRequestDto;
import com.ssafy.dingdong.domain.letter.dto.request.LetterRequestDto;
import com.ssafy.dingdong.domain.letter.dto.request.LetterSNSRequestDto;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;


public interface LetterSwagger {

    DataResponse getLetterList(Authentication authentication, Pageable pageable);

    DataResponse getLetterDetail(Authentication authentication, Long letterId);

    CommonResponse sendAuthLetter(Authentication authentication, LetterRequestDto requestDto);
    CommonResponse sendAuthLetterALL(Authentication authentication, LetterAllRequestDto requestDto);
    CommonResponse sendGuestLetter(LetterRequestDto requestDto, HttpServletRequest request);
    CommonResponse sendSnsLetter(Authentication authentication, LetterSNSRequestDto requestDto);

    DataResponse getLetterSNS(String letterId);
}
