package com.ssafy.dingdong.domain.letter.service;

import com.ssafy.dingdong.domain.letter.dto.request.LetterRequestDto;
import com.ssafy.dingdong.domain.letter.dto.response.LetterListResponseDto;
import com.ssafy.dingdong.domain.letter.dto.response.LetterResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface LetterService {
    Page<LetterListResponseDto> getLetterList(String memberId, Pageable pageable);

    LetterResponseDto getLetterDetail(String memberId, Long letterId);

    void sendLetter(String memberId, LetterRequestDto requestDto);

    void sendGuestLetter(LetterRequestDto requestDto, String ipAddress, String memberId);

    void reportLetter(Long letterId);
    String getLetterFromId(Long letterId);
}
