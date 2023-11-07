package com.ssafy.dingdong.domain.visitorbook.entity;

import com.ssafy.dingdong.domain.visitorbook.dto.request.VisitorBookRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VisitorBook {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String writeFrom;
    private String writeTo;
    private String description;
    private LocalDateTime writeTime;

    @Column(columnDefinition = "TINYINT(1) DEFAULT 0")
    private Boolean isReport;

    private int color;

    private int rotate;

    private String ipAddress;

    public static VisitorBook build(VisitorBookRequestDto requestDto,
                                    String writeFrom, String writeTo,
                                    String ipAddress) {
        return VisitorBook.builder()
                .writeFrom(writeFrom)
                .writeTo(writeTo)
                .description(requestDto.getDescription())
                .writeTime(LocalDateTime.now())
                .isReport(false)
                .color(requestDto.getColor())
                .rotate(requestDto.getRotate())
                .ipAddress(ipAddress)
                .build();
    }
}
