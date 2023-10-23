package com.ssafy.dingdong.domain.letter.entity;

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

    private String title;
    private String description;
    private String letterFrom;
    private String letterTo;

    @OneToOne
    @JoinColumn(name = "stamp_id")
    private Stamp stamp;

    @Column(nullable = false, columnDefinition = "TINYINT(1) DEFAULT 0")
    private Boolean isRead;

    @Column(nullable = false)
    private String ipAddress;
    private LocalDateTime createTime;

    @PrePersist
    public void setSendDate() {
        this.createTime = LocalDateTime.now();
        this.isRead = false;
    }

    public static Letter build(LetterRequestDto requestDto,
                               String memberId,
                               Boolean anonymousFlag,
                               Stamp stamp,
                               String ipAddress) {

        return Letter.builder()
                     .anonymousFlag(anonymousFlag)
                     .title(requestDto.title())
                     .description(requestDto.description())
                     .stamp(stamp)
                     .letterFrom(memberId)
                     .letterTo(requestDto.letterTo())
                     .ipAddress(ipAddress)
                     .build();
    }
}
