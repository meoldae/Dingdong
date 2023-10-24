package com.ssafy.dingdong.domain.avatar.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
public class Avatar {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long avatarId;
    private String glbUrl;
    private String thumbUrl;
}
