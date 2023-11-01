package com.ssafy.dingdong.domain.cs.service;

import com.ssafy.dingdong.domain.cs.dto.request.CustomerRequestDto;
import com.ssafy.dingdong.domain.cs.entity.Cs;
import com.ssafy.dingdong.domain.cs.enums.CsType;
import com.ssafy.dingdong.domain.cs.repository.CsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class CsServiceImpl implements CsService {
    private final CsRepository csRepository;
    @Override
    public void createInquiry(String memberId, CustomerRequestDto customerRequestDto) {
        log.info(customerRequestDto);
        CsType csType = CsType.ETC;
        if(customerRequestDto.getCategory().equals("1")) csType = CsType.ERROR_REPORT;
        else if(customerRequestDto.equals("2")) csType = CsType.BUG;
        else csType = CsType.ETC;
        csRepository.save(Cs.build(memberId, csType, customerRequestDto.getContent()));
    }
}
