package com.ssafy.dingdong.domain.score.dto.response;

import com.ssafy.dingdong.domain.score.entity.Score;
import com.ssafy.dingdong.domain.score.enums.ScoreType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Map;
@Data
@AllArgsConstructor
@Builder
@ToString
public class ScoreResponseDto {
    int recordCount;
    String memberId;
    String username;
}
