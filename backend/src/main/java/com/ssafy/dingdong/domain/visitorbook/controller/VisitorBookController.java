package com.ssafy.dingdong.domain.visitorbook.controller;

import com.ssafy.dingdong.domain.visitorbook.dto.request.VisitorBookRequestDto;
import com.ssafy.dingdong.domain.visitorbook.dto.response.VisitorBookResponseDto;
import com.ssafy.dingdong.domain.visitorbook.service.VisitorBookService;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;
import com.ssafy.dingdong.global.response.ResponseService;
import com.ssafy.dingdong.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/visitorbook")
public class VisitorBookController implements VisitorBookSwagger {

    private final ResponseService responseService;
    private final VisitorBookService visitorBookService;

    @Value("${letter.anonymous}")
    private String ANONYMOUS_UUID;

    @Override
    @GetMapping("/list/{roomId}")
    public DataResponse getVisitorBookList(@PathVariable Long roomId) {
        List<VisitorBookResponseDto> result = visitorBookService.getVisitorBookList(roomId);
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, result);
    }

    @Override
    @GetMapping("/detail/{visitorBookId}")
    public DataResponse getVisitorBookDetail(@PathVariable Long visitorBookId) {
        VisitorBookResponseDto result = visitorBookService.getVisitorBookDetail(visitorBookId);
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, result);
    }

    @Override
    @PostMapping
    public CommonResponse sendVisitorBook(Authentication authentication,  @RequestBody VisitorBookRequestDto requestDto) {
        String memberId = authentication.getName();
        visitorBookService.sendVisitorBook(memberId, requestDto);
        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }

    @Override
    @PostMapping("/guest")
    public CommonResponse sendVisitorBookGuest(@RequestBody VisitorBookRequestDto requestDto, HttpServletRequest request) {
        String ipAddress = "";
        String memberId = ANONYMOUS_UUID;

        ipAddress = request.getHeader("X-FORWARDED-FOR");
        if (ipAddress == null || "".equals(ipAddress)) {
            ipAddress = request.getRemoteAddr();
        }
        visitorBookService.sendVisitorBookGuest(memberId, ipAddress, requestDto);
        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }
}

