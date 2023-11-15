package com.ssafy.dingdong.domain.score.entity;

import com.ssafy.dingdong.domain.report.entity.Report;
import com.ssafy.dingdong.domain.report.enums.ReportType;
import com.ssafy.dingdong.domain.score.enums.ScoreType;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scoreId;

    private String memberId;

    private Long roomdId;

    @Enumerated(EnumType.STRING)
    private ScoreType type;

    private Long recordCount;

    private LocalDateTime recordTime;

    public static Score build(String memberId, Long roomId, ScoreType type, Long recordCount) {
        return Score.builder()
                .memberId(memberId)
                .roomdId(roomId)
                .type(type)
                .recordCount(recordCount)
                .recordTime(LocalDateTime.now())
                .build();
    }

}
