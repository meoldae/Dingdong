package com.ssafy.dingdong.domain.report.controller;

import com.ssafy.dingdong.domain.report.service.ReportServiceService;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.ResponseService;
import com.ssafy.dingdong.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/report")
@RequiredArgsConstructor
public class ReportController implements ReportSwagger{

    private final ReportServiceService reportService;
    private final ResponseService responseService;


    @Override
    @PostMapping("/letter/{letterId}")
    public CommonResponse createLetterReport(Authentication authentication, @PathVariable Long letterId) {
        String memberId = authentication.getName();
        reportService.createLetterReport(memberId, letterId);
        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }

    @Override
    @PostMapping("/chat/{chatId}")
    public CommonResponse createChatReport(Authentication authentication, @PathVariable Long chatId) {
        String memberId = authentication.getName();
        reportService.createChatReport(memberId, chatId);
        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }
}
