package com.ssafy.dingdong.global.scheduler;

import java.time.LocalDateTime;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ssafy.dingdong.domain.ccu.service.CCUService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Component
@RequiredArgsConstructor
public class CCUScheduler {

	private final CCUService ccuService;

	@Scheduled(cron = "0 0/30 * * * *")
	public void countingCCU() {
		LocalDateTime now = LocalDateTime.now();
		log.info("현재 시각 : {} ", now);
		ccuService.createCCUCount(now);
	}
}
