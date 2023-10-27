package com.ssafy.dingdong.domain.score.service;

import com.ssafy.dingdong.domain.letter.dto.response.RecordResponseDto;
import com.ssafy.dingdong.domain.letter.service.LetterService;
import com.ssafy.dingdong.domain.member.service.MemberService;
import com.ssafy.dingdong.domain.room.dto.response.RoomScoreDto;
import com.ssafy.dingdong.domain.room.service.RoomService;
import com.ssafy.dingdong.domain.score.dto.response.ScoreBoardResponseDto;
import com.ssafy.dingdong.domain.score.dto.response.ScoreResponseDto;
import com.ssafy.dingdong.domain.score.entity.Score;
import com.ssafy.dingdong.domain.score.enums.ScoreType;
import com.ssafy.dingdong.domain.score.repository.ScoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class ScoreServiceImpl implements ScoreService{

    private final ScoreRepository scoreRepository;
    private final LetterService letterService;
    private final RoomService roomService;
    private final MemberService memberService;
    
    @Transactional
    @Scheduled(cron = "0 0 * * * *")
    public void insertScoreEveryHourOnTheHour() {
        // 편지 많이 보낸 사람
        RecordResponseDto letterFromRecord = letterService.findTopLetterFrom();
        // 편지 많이 받은 사람
        RecordResponseDto letterToRecord = letterService.findTopLetterTo();
        List<RoomScoreDto> roomScoreDto = roomService.getRoomScore();


        Score letterFromScore = Score.build(
                letterFromRecord.getMemberId(),
                roomService.getRoomByMemberId(letterFromRecord.getMemberId()).roomId(),
                ScoreType.LETTER_SEND_COUNT, letterFromRecord.getCount());
        Score letterToScore = Score.build(
                letterToRecord.getMemberId(),
                roomService.getRoomByMemberId(letterToRecord.getMemberId()).roomId(),
                ScoreType.LETTER_RECEIVE_COUNT,
                letterFromRecord.getCount());

        //Score roomHeartScore = Score.build();
        scoreRepository.save(letterFromScore);
        scoreRepository.save(letterToScore);
    }

    public LocalDateTime getLatestRecordTime() {
        Optional<LocalDateTime> latestTimeOpt = scoreRepository.findLatestRecordTime();
        return latestTimeOpt
                .map(dateTime -> dateTime.withMinute(0).withSecond(0).withNano(0))
                .orElse(null);
    }

    @Override
    public ScoreBoardResponseDto getLatestScores() {
        Map<ScoreType, ScoreResponseDto> latestScores = new HashMap<>();

        for (ScoreType type : ScoreType.values()) {
            Score score = scoreRepository.findLatestByType(type, PageRequest.of(0, 1))
                    .stream().findFirst().orElse(null);
            if (score != null) {
                ScoreResponseDto scoreResponse = ScoreResponseDto.builder()
                        .recordCount(score.getRecordCount())
                        .memberId(score.getMemberId())
                        .username(memberService.getMemberById(score.getMemberId()).nickname())
                        .build();
                latestScores.put(type, scoreResponse);
            }
        }

        ScoreBoardResponseDto scoreBoardResponse = ScoreBoardResponseDto.builder()
                .recordTime(getLatestRecordTime())
                .scores(latestScores)
                .build();

        return scoreBoardResponse;
    }
}
