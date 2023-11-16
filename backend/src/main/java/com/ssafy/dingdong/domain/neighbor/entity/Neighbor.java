package com.ssafy.dingdong.domain.neighbor.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
public class Neighbor {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long neighborId;
	@Type(type="uuid-char")
	@Column(length = 36, updatable = false, nullable = false)
	private UUID applicantId;
	@Type(type="uuid-char")
	@Column(length = 36, updatable = false, nullable = false)
	private UUID acceptorId;
	private LocalDateTime createTime;
	private LocalDateTime connectTime;
	private LocalDateTime cancelTime;

	@Builder
	public Neighbor(UUID applicantId, UUID acceptorId, LocalDateTime createTime) {
		this.applicantId = applicantId;
		this.acceptorId = acceptorId;
		this.createTime = createTime;
	}

	public void connect(LocalDateTime connectTime){
		this.connectTime = connectTime;
	}

	public void renewal(UUID applicantId, UUID acceptorId){
		this.applicantId = applicantId;
		this.acceptorId = acceptorId;
		this.createTime = LocalDateTime.now();
		this.connectTime = null;
		this.cancelTime = null;
	}

	public void disconnect(LocalDateTime disconnectTime) {
		this.cancelTime = disconnectTime;
	}
}
