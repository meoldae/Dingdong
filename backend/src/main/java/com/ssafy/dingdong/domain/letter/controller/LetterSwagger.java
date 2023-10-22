package com.ssafy.dingdong.domain.letter.controller;

import com.ssafy.dingdong.domain.letter.dto.request.LetterRequestDto;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;


public interface LetterSwagger {

    DataResponse getLetterList(Authentication authentication, Pageable pageable);

    DataResponse getLetterDetail(Authentication authentication, Long letterId);

    CommonResponse sendLetter(LetterRequestDto requestDto);
}
