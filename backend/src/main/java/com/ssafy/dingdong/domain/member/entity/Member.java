package com.ssafy.dingdong.domain.member.entity;

import lombok.Getter;
import lombok.extern.log4j.Log4j;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Log4j
@Getter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type="org.hibernate.type.UUIDCharType")
    @Column(length = 36, columnDefinition = "varchar(36)", updatable = false, nullable = false)
    private UUID memberId;
    private String provider;
    private String username;

    @Length(min = 1, max = 8)
    private String nickname;
    private String email;
    private LocalDateTime createTime;
    private LocalDateTime exitTime;
    private Long characterId;
}
