package com.ssafy.dingdong.domain.letter.service;

import com.ssafy.dingdong.domain.letter.dto.response.LetterResponseDto;
import com.ssafy.dingdong.domain.letter.repository.LetterRepository;
import com.ssafy.dingdong.global.exception.CustomException;
import com.ssafy.dingdong.global.exception.ExceptionStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class LetterServiceImpl implements LetterService {

    private final LetterRepository letterRepository;

    @Override
    public List<LetterResponseDto> getLetterList(String memberId) {
        List<LetterResponseDto> result = letterRepository.findAllByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.LETTER_FOUND_EXCEPTION));

        return result;
    }
}
