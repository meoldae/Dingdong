package com.ssafy.dingdong.domain.member.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import lombok.extern.log4j.Log4j2;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.validator.constraints.Length;
import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Log4j2
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Type(type="uuid-char")
    @Column(length = 36, updatable = false, nullable = false)
    private UUID memberId;
    private String provider;
    private String username;

    @Length(min = 1, max = 8)
    private String nickname;
    private String email;
    private LocalDateTime createTime;
    private LocalDateTime exitTime;
    private Long avatarId;

    @Builder
    public Member(String provider, String email, LocalDateTime createTime, String username){
        this.provider = provider;
        this.email = email;
        this.createTime = createTime;
        this.username = username;
    }

    public void signUp(String nickname, Long avatarId){
        this.nickname = nickname;
        this.avatarId = avatarId;
        this.exitTime = null;
    }
}
