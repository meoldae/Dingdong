package com.ssafy.dingdong.domain.letter.controller;

import com.ssafy.dingdong.global.response.DataResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;


public interface LetterSwagger {

    DataResponse getLetterList(Authentication authentication, Pageable pageable);
}
