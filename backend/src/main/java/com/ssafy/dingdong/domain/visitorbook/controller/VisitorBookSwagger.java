package com.ssafy.dingdong.domain.visitorbook.controller;

import com.ssafy.dingdong.domain.letter.dto.request.LetterRequestDto;
import com.ssafy.dingdong.domain.letter.dto.request.LetterSNSRequestDto;
import com.ssafy.dingdong.domain.visitorbook.dto.request.VisitorBookRequestDto;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;

import javax.servlet.http.HttpServletRequest;


public interface VisitorBookSwagger {

    DataResponse getVisitorBookList(Long roomId);
    DataResponse getVisitorBookDetail(Long visitorBookId);
    CommonResponse sendVisitorBook(Authentication authentication, VisitorBookRequestDto requestDto);
    CommonResponse sendVisitorBookGuest(VisitorBookRequestDto requestDto, HttpServletRequest request);

}
