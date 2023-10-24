package com.ssafy.dingdong.domain.score.service;

import com.ssafy.dingdong.domain.letter.dto.response.LetterRecordResponseDto;
import com.ssafy.dingdong.domain.letter.service.LetterService;
import com.ssafy.dingdong.domain.score.entity.Score;
import com.ssafy.dingdong.domain.score.enums.ScoreType;
import com.ssafy.dingdong.domain.score.repository.ScoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Log4j2
@Service
@RequiredArgsConstructor
public class ScoreServiceImpl implements ScoreService{

    private final ScoreRepository scoreRepository;
    private final LetterService letterService;


    @Scheduled(cron = "0 0 * * * *")
    public void insertScoreEveryHourOnTheHour() {
        // 편지 많이 보낸 사람
        LetterRecordResponseDto letterFromRecord = letterService.findTopLetterFrom();
        // 편지 많이 받은 사람
        LetterRecordResponseDto letterToRecord = letterService.findTopLetterTo();

        Score letterFromScore = Score.build(letterFromRecord.getMemberId(), ScoreType.LETTER_SEND_COUNT, letterFromRecord.getCount());
        Score letterToScore = Score.build(letterToRecord.getMemberId(), ScoreType.LETTER_RECEIVE_COUNT, letterFromRecord.getCount());
        log.info(letterFromRecord);
        log.info(letterToRecord);
        log.info(letterFromScore);
        log.info(letterToScore);
        scoreRepository.save(letterFromScore);
        scoreRepository.save(letterToScore);

        //TODO (방 좋아요 많은 사람, 팔로워 수 많은 사람)
    }
}
