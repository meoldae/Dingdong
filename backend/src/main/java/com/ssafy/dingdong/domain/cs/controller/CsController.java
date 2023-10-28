package com.ssafy.dingdong.domain.cs.controller;

import com.ssafy.dingdong.domain.cs.dto.request.CustomerRequestDto;
import com.ssafy.dingdong.domain.cs.service.CsService;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.ResponseService;
import com.ssafy.dingdong.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequestMapping("/cs")
@RequiredArgsConstructor
public class CsController implements CsSwagger {

    private final CsService csService;
    private final ResponseService responseService;

    @Override
    @PostMapping
    public CommonResponse createInquiry(Authentication authentication, @RequestBody CustomerRequestDto customerRequestDto) {
        String memberId = authentication.getName();
        csService.createInquiry(memberId, customerRequestDto);
        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }
}
