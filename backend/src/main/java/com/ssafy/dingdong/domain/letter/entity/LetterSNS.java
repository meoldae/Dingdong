package com.ssafy.dingdong.domain.letter.entity;

import com.ssafy.dingdong.domain.letter.dto.request.LetterSNSRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LetterSNS {

    @Id
    private String letterId;
    private String memberId;
    private Long roomId;

    @Length(min = 1, max = 8)
    private String letterTo;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Length(min = 1, max = 8)
    private String letterFrom;

    private Long stampId;
    private LocalDateTime createTime;

    @PrePersist
    public void sendLetter() {
        this.createTime = LocalDateTime.now();
    }

    public static LetterSNS build(LetterSNSRequestDto requestDto,
                                  String memberId) {

        return LetterSNS.builder()
                .memberId(memberId)
                .letterId(requestDto.getLetterId())
                .roomId(requestDto.getRoomId())
                .letterTo(requestDto.getLetterTo())
                .description(requestDto.getDescription())
                .letterFrom(requestDto.getLetterFrom())
                .stampId(requestDto.getStampId())
                .build();
    }
}

