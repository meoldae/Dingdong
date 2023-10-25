package com.ssafy.dingdong.domain.score.service;

import com.ssafy.dingdong.domain.score.dto.response.ScoreBoardResponseDto;
import com.ssafy.dingdong.domain.score.entity.Score;
import com.ssafy.dingdong.domain.score.enums.ScoreType;

public interface ScoreService {
    ScoreBoardResponseDto getLatestScores();
}
