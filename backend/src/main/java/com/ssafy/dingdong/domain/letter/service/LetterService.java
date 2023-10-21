package com.ssafy.dingdong.domain.letter.service;

import com.ssafy.dingdong.domain.letter.dto.response.LetterResponseDto;

import java.util.List;

public interface LetterService {
    List<LetterResponseDto> getLetterList(String memberId);
}
