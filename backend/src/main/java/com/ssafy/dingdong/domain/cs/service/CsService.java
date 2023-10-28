package com.ssafy.dingdong.domain.cs.service;

import com.ssafy.dingdong.domain.cs.dto.request.CustomerRequestDto;

public interface CsService {
    void createInquiry(String memberId, CustomerRequestDto customerRequestDto);
}
