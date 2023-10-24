package com.ssafy.dingdong.domain.letter.service;

import com.ssafy.dingdong.domain.letter.dto.request.LetterRequestDto;
import com.ssafy.dingdong.domain.letter.dto.response.LetterListResponseDto;
import com.ssafy.dingdong.domain.letter.dto.response.LetterRecordResponseDto;
import com.ssafy.dingdong.domain.letter.dto.response.LetterResponseDto;
import com.ssafy.dingdong.domain.letter.entity.Letter;
import com.ssafy.dingdong.domain.letter.entity.Stamp;
import com.ssafy.dingdong.domain.letter.repository.LetterRepository;
import com.ssafy.dingdong.domain.letter.repository.StampRepository;
import com.ssafy.dingdong.global.exception.CustomException;
import com.ssafy.dingdong.global.exception.ExceptionStatus;
import com.ssafy.dingdong.global.util.EncryptUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class LetterServiceImpl implements LetterService {

    private final LetterRepository letterRepository;
    private final StampRepository stampRepository;
    private final EncryptUtils encryptUtils;

    @Override
    public Page<LetterListResponseDto> getLetterList(String memberId, Pageable pageable) {
        Page<LetterListResponseDto> result = letterRepository.findAllByLetterToAndIsReportFalse(memberId, pageable);

        return result;
    }

    @Override
    public LetterResponseDto getLetterDetail(String memberId, Long letterId) {
        LetterResponseDto result = letterRepository.findByLetterId(memberId, letterId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.LETTER_NOT_FOUND));

        result.setDescription(encryptUtils.decrypt(result.getDescription()));
        updateReadLetter(letterId);

        return result;
    }

    @Override
    public void sendLetter(String memberId, LetterRequestDto requestDto) {
        Stamp stamp = stampRepository.findById(requestDto.getStampId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.NOT_FOUND_STAMP));

        requestDto.setDescription(encryptUtils.encrypt(requestDto.getDescription()));
        Letter letter = Letter.build(requestDto, memberId,false, stamp, "");
        letterRepository.save(letter);
    }

    @Override
    public void sendGuestLetter(LetterRequestDto requestDto, String ipAddress, String memberId) {
        Stamp stamp = stampRepository.findById(requestDto.getStampId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.NOT_FOUND_STAMP));

        requestDto.setDescription(encryptUtils.encrypt(requestDto.getDescription()));
        Letter letter = Letter.build(requestDto, memberId, true, stamp, ipAddress);
        letterRepository.save(letter);
    }

    @Override
    public String getLetterFromId(Long letterId) {
        return letterRepository.findLetterFromByLetterId(letterId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.LETTER_FROM_NOT_FOUND));
    }

    public void updateReadLetter(Long letterId) {
        letterRepository.updateIsReadById(letterId);
    }

    @Override
    public void reportLetter(Long letterId) { letterRepository.updateIsReportById(letterId); }

    @Override
    public LetterRecordResponseDto findTopLetterFrom() {
        List<Object[]> result = letterRepository.findTopLetterFrom();
        log.info(result);
        if (!result.isEmpty()) {
            log.info("비어있지않음");
            log.info(result.get(0)[0]);
            log.info(result.get(0)[1]);
            LetterRecordResponseDto.builder()
                    .memberId((String) result.get(0)[0])
                    .count(((Number) result.get(0)[1]).intValue())
                    .build();
        }
        else {
            log.info("비어있음");
        }
        return LetterRecordResponseDto.builder().build();
    }

    @Override
    public LetterRecordResponseDto findTopLetterTo() {
        List<Object[]> result = letterRepository.findTopLetterTo();
        log.info(result);
        if (!result.isEmpty()) {
            log.info("비어있지않음");
            log.info(result.get(0).toString());
            LetterRecordResponseDto.builder()
                    .memberId((String) result.get(0)[0])
                    .count(((Number) result.get(0)[1]).intValue())
                    .build();
        }
        else {
            log.info("비어있음");
        }
        return LetterRecordResponseDto.builder().build();
    }

}
