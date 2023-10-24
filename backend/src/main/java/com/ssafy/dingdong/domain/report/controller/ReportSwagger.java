package com.ssafy.dingdong.domain.report.controller;

import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;
import org.springframework.security.core.Authentication;


public interface ReportSwagger {

    CommonResponse createLetterReport (Authentication authentication, Long letterId);
    CommonResponse createChatReport (Authentication authentication, Long chatId);
}
