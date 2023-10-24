package com.ssafy.dingdong.domain.report.service;

import com.ssafy.dingdong.domain.letter.dto.response.LetterResponseDto;
import com.ssafy.dingdong.domain.letter.repository.LetterRepository;
import com.ssafy.dingdong.domain.member.entity.Member;
import com.ssafy.dingdong.domain.member.repository.MemberRepository;
import com.ssafy.dingdong.domain.report.entity.Report;
import com.ssafy.dingdong.domain.report.enums.ReportType;
import com.ssafy.dingdong.domain.report.repository.ReportRepository;
import com.ssafy.dingdong.global.exception.CustomException;
import com.ssafy.dingdong.global.exception.ExceptionStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService{

    private final ReportRepository reportRepository;
    private final LetterRepository letterRepository;
    private final MemberRepository memberRepository;

    @Override
    public void createLetterReport(String memberId, Long letterId) {
        String letterFromId = letterRepository.findLetterFromByLetterId(letterId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.LETTER_FROM_NOT_FOUND));
        Report report = Report.build(memberId, letterFromId, ReportType.LETTER, letterId);
        reportRepository.save(report);

//        letter isReport true 처리
//
//        신고 당한 유저 정지 처리
//        long reportCount = reportRepository.countByReportTo(letterFromId);
//        Member member = memberRepository.findById(letterFromId)
//                .orElseThrow(() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND));
//
//        if (reportCount >= 10) {
//            // 영구 정지 처리
//        } else if (reportCount >= 3) {
//            // 일정 기간 정지
//            // 누적 횟수 초기화
//        }
    }

    @Override
    public void createChatReport(String memberId, Long chatId) {
        //추후 로직 구현
    }
}
