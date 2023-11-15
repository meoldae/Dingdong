package com.ssafy.dingdong.domain.cs.controller;

import com.ssafy.dingdong.domain.cs.dto.request.CustomerRequestDto;
import com.ssafy.dingdong.global.response.CommonResponse;
import org.springframework.security.core.Authentication;


public interface CsSwagger {

    CommonResponse createInquiry(Authentication authentication, CustomerRequestDto customerRequestDto);

}
