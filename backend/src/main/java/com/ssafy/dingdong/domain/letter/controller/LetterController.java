package com.ssafy.dingdong.domain.letter.controller;

import com.ssafy.dingdong.domain.letter.dto.request.LetterRequestDto;
import com.ssafy.dingdong.domain.letter.dto.response.LetterListResponseDto;
import com.ssafy.dingdong.domain.letter.dto.response.LetterResponseDto;
import com.ssafy.dingdong.domain.letter.service.LetterService;
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

@Log4j2
@RestController
@RequestMapping("/letter")
@RequiredArgsConstructor
public class LetterController implements LetterSwagger {

    private final ResponseService responseService;
    private final LetterService letterService;

    @Value("${letter.anonymous}")
    private String ANONYMOUS_UUID;

    @Override
    @GetMapping
    public DataResponse getLetterList(Authentication authentication,
                                      @PageableDefault(size = 20) Pageable pageable) {
        String memberId = authentication.getName();
        Page<LetterListResponseDto> result = letterService.getLetterList(memberId, pageable);

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, result);
    }

    @Override
    @GetMapping("/{letterId}")
    public DataResponse getLetterDetail(Authentication authentication,
                                        @PathVariable Long letterId) {
        String memberId = authentication.getName();
        LetterResponseDto result = letterService.getLetterDetail(memberId, letterId);
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, result);
    }

    @Override
    @PostMapping
    public CommonResponse sendAuthLetter(Authentication authentication,
                                     @RequestBody LetterRequestDto requestDto) {
        String memberId = authentication.getName();
        letterService.sendLetter(memberId, requestDto);

        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }

    @Override
    @PostMapping("/guest")
    public CommonResponse sendGuestLetter(@RequestBody LetterRequestDto requestDto,
                                          HttpServletRequest request) {

        String ipAddress = "";
        String memberId = ANONYMOUS_UUID;

        ipAddress = request.getHeader("X-FORWARDED-FOR");
        if (ipAddress == null || "".equals(ipAddress)) {
            ipAddress = request.getRemoteAddr();
        }

        letterService.sendGuestLetter(requestDto, ipAddress, memberId);
        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }

}

