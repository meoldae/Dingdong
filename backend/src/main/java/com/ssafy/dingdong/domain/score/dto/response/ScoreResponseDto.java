package com.ssafy.dingdong.domain.score.dto.response;

import com.ssafy.dingdong.domain.score.entity.Score;
import com.ssafy.dingdong.domain.score.enums.ScoreType;

import java.time.LocalDateTime;
import java.util.Map;

public class ScoreResponseDto {
    int recordCount;
    String memberId;
    String username;
}
