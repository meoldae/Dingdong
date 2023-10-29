package com.ssafy.dingdong.domain.ccu.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.ssafy.dingdong.domain.ccu.entity.CCU;
import com.ssafy.dingdong.domain.ccu.repository.CCURepository;
import com.ssafy.dingdong.domain.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CCUServiceImpl implements CCUService{

	private final MemberService memberService;
	private final CCURepository ccuRepository;

	@Override
	public void createCCUCount(LocalDateTime now) {
		Long ccuCount = memberService.getCCUCount();
		CCU ccu = CCU.builder().ccuCount(ccuCount).now(now).build();

		ccuRepository.save(ccu);
	}
}
