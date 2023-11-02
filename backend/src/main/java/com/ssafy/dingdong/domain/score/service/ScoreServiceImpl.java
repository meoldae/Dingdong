package com.ssafy.dingdong.domain.score.service;

import com.ssafy.dingdong.domain.letter.dto.response.LetterScoreDto;
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
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.List;

@Log4j2
@Service
@RequiredArgsConstructor
public class ScoreServiceImpl implements ScoreService{

    private final ScoreRepository scoreRepository;
    private final LetterService letterService;
    private final RoomService roomService;
    private final MemberService memberService;

    public List<Score> convertLetterFromScoreToScores(List<LetterScoreDto> dtos) {
        return dtos.stream()
                .map(dto -> Score.build(dto.getMemberId(),
                        roomService.getRoomIdByMemberId(dto.getMemberId()),
                        ScoreType.LETTER_SEND_COUNT,
                        dto.getCount()))
                .collect(Collectors.toList());
    }

    public List<Score> convertLetterToScoreToScores(List<LetterScoreDto> dtos) {
        return dtos.stream()
                .map(dto -> Score.build(dto.getMemberId(),
                        roomService.getRoomIdByMemberId(dto.getMemberId()),
                        ScoreType.LETTER_RECEIVE_COUNT,
                        dto.getCount()))
                .collect(Collectors.toList());
    }

    public List<Score> convertRoomScoreToScores(List<RoomScoreDto> dtos) {
        return dtos.stream()
                .map(dto -> Score.build(dto.getMemberId(), dto.getRoomId(), ScoreType.ROOM_LIKE_COUNT, dto.getHeartCount()))
                .collect(Collectors.toList());
    }
 
    @Scheduled(cron = "0 0 * * * *")
    public void insertScoreEveryHourOnTheHour() {
        List<LetterScoreDto> letterFromScoreList= letterService.getLetterFromScore();
        List<LetterScoreDto> letterToScoreList = letterService.getLetterToScore();
        List<RoomScoreDto> roomScoreList = roomService.getRoomScore();
        List<Score> insertScoreList = new ArrayList<>();

        insertScoreList.addAll(convertLetterFromScoreToScores(letterFromScoreList));
        insertScoreList.addAll(convertLetterToScoreToScores(letterToScoreList));
        insertScoreList.addAll(convertRoomScoreToScores(roomScoreList));

        scoreRepository.saveAll(insertScoreList);
    }

    public LocalDateTime getLatestRecordTime() {
        Optional<LocalDateTime> latestTimeOpt = scoreRepository.findLatestRecordTime();
        return latestTimeOpt
                .map(dateTime -> dateTime.withMinute(0).withSecond(0).withNano(0))
                .orElse(null);
    }

    @Override
    public ScoreBoardResponseDto getLatestScores() {
        Map<ScoreType, List<ScoreResponseDto>> latestScores = new HashMap<>();

        for (ScoreType type : ScoreType.values()) {
            Optional<LocalDateTime> time = scoreRepository.findLatestRecordTime();
            List<Score> scores = scoreRepository.findLatestByType(type, time);
            List<ScoreResponseDto> list = new ArrayList<>();
            for(Score score : scores) {
                if (score != null) {
                    ScoreResponseDto scoreResponse = ScoreResponseDto.builder()
                            .recordCount(score.getRecordCount())
                            .memberId(score.getMemberId())
                            .nickname(memberService.getMemberById(score.getMemberId()).nickname())
                            .roomId(score.getRoomdId())
                            .build();
                    list.add(scoreResponse);
                }
            }
            latestScores.put(type, list);
        }

        ScoreBoardResponseDto scoreBoardResponse = ScoreBoardResponseDto.builder()
                .recordTime(getLatestRecordTime())
                .scores(latestScores)
                .build();

        return scoreBoardResponse;
    }
}
