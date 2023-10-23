package com.ssafy.dingdong.domain.letter.controller;

import com.ssafy.dingdong.domain.letter.dto.request.LetterRequestDto;
import com.ssafy.dingdong.domain.letter.dto.response.LetterListResponseDto;
import com.ssafy.dingdong.domain.letter.dto.response.LetterResponseDto;
import com.ssafy.dingdong.domain.letter.entity.Letter;
import com.ssafy.dingdong.domain.letter.service.LetterService;
import com.ssafy.dingdong.global.response.CommonResponse;
import com.ssafy.dingdong.global.response.DataResponse;
import com.ssafy.dingdong.global.response.ResponseService;
import com.ssafy.dingdong.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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
    private static final String ANONYMOUS_UUID = "f684f5ed-f8d0-4823-8b59-630d6a3cd5a1";

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
//        String memberId = authentication.getName();
        String memberId = "eb7c4309-5724-4ef6-9be2-d59b5b5675d8";
        LetterResponseDto result = letterService.getLetterDetail(memberId, letterId);
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, result);
    }

    @Override
    @PostMapping
    public CommonResponse sendAuthLetter(Authentication authentication,
                                     @RequestBody LetterRequestDto requestDto) {

        String memberId = "6b027c6e-0219-4f94-84a9-1a4bc0d23ef4";
        letterService.sendLetter(memberId, requestDto);

        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }

    @Override
    @PostMapping("/guest")
    public CommonResponse sendGuestLetter(@RequestBody LetterRequestDto requestDto,
                                          HttpServletRequest request) {

        String ipAddress = "";
        String memberId = ANONYMOUS_UUID;

        if (request != null) {
            ipAddress = request.getHeader("X-FORWARDED-FOR");
            if (ipAddress == null || "".equals(ipAddress)) {
                ipAddress = request.getRemoteAddr();
            }
        }

        letterService.sendGuestLetter(requestDto, ipAddress, memberId);
        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }


}

