package com.ssafy.dingdong.domain.report.entity;

import com.ssafy.dingdong.domain.member.entity.Member;
import com.ssafy.dingdong.domain.report.enums.ReportType;
import lombok.*;
import lombok.extern.log4j.Log4j2;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Report {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reporteFrom;
    private String reportTo;

    @Enumerated(EnumType.STRING)
    private ReportType type;

    private Long contentId;
    private LocalDateTime reportTime;

    public static Report build(String reportFrom, String reportTo, ReportType type, Long contentId) {
        return Report.builder()
                    .reporteFrom(reportFrom)
                    .reportTo(reportTo)
                    .type(type)
                    .contentId(contentId)
                    .reportTime(LocalDateTime.now())
                    .build();
    }

}
