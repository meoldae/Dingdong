package com.ssafy.dingdong.domain.letter.entity;

import com.ssafy.dingdong.domain.letter.dto.request.LetterAllRequestDto;
import com.ssafy.dingdong.domain.letter.dto.request.LetterRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Letter {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean anonymousFlag;

    private String nickName;

    @Column(columnDefinition = "TEXT")
    private String description;
    private String letterFrom;
    private String letterTo;

    @OneToOne
    @JoinColumn(name = "stamp_id")
    private Stamp stamp;

    @Column(nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
    private Boolean isRead;
    @Column(nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
    private Boolean isReport;

    @Column(nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
    private Boolean isRandom;

    @Column(nullable = false)
    private String ipAddress;

    private LocalDateTime createTime;

    @PrePersist
    public void setSendDate() {
        this.createTime = LocalDateTime.now();
        this.isRead = false;
        this.isReport = false;
        this.isRandom = false;
    }

    public static Letter build(LetterRequestDto requestDto,
                               String memberId,
                               String letterTo,
                               Boolean anonymousFlag,
                               Stamp stamp,
                               String ipAddress) {

        return Letter.builder()
                     .anonymousFlag(anonymousFlag)
                     .nickName(requestDto.getNickName())
                     .description(requestDto.getDescription())
                     .stamp(stamp)
                     .letterFrom(memberId)
                     .letterTo(letterTo)
                     .ipAddress(ipAddress)
                     .build();
    }
}
