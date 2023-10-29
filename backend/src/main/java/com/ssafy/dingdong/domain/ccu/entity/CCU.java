package com.ssafy.dingdong.domain.ccu.entity;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CCU {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ccuId;
	private Long ccuCount;
	private LocalDateTime period;

	@Builder
	public CCU(Long ccuCount, LocalDateTime now){
		this.ccuCount = ccuCount;
		this.period = now;
	}
}
