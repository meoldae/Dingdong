package com.ssafy.dingdong.domain.letter.entity;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
public class Letter {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer anonymousFlag;
    private String description;
    private String letterFrom;
    private String letterTo;

    @OneToOne
    @JoinColumn(name = "stamp_id")
    private Stamp stamp;
    private LocalDateTime createTime;

    @PrePersist
    public void setSendDate() {
        this.createTime = LocalDateTime.now();
    }
}
