package com.ssafy.dingdong.domain.report.service;

import com.ssafy.dingdong.domain.letter.service.LetterService;
import com.ssafy.dingdong.domain.report.entity.Report;
import com.ssafy.dingdong.domain.report.enums.ReportType;
import com.ssafy.dingdong.domain.report.repository.ReportRepository;
import com.ssafy.dingdong.domain.visitorbook.service.VisitorBookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

@Log4j2
@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;
    private final LetterService letterService;
    private final VisitorBookService visitorBookService;


    @Override
    public void createLetterReport(String memberId, Long letterId) {
        String letterFromId = letterService.getLetterFromId(letterId);
        Report report = Report.build(memberId, letterFromId, ReportType.LETTER, letterId);
        reportRepository.save(report);
        letterService.reportLetter(letterId);

        //TODO
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
        //채팅 기능 추가 후 구현 예정
    }

    @Override
    public void createVisitorBookReport(String memberId, Long visitorBookId) {
        String visitorBookFrom = visitorBookService.getVisitorBookFromById(visitorBookId);
        Report report = Report.build(memberId, visitorBookFrom, ReportType.VISITORBOOK, visitorBookId);
        reportRepository.save(report);
        visitorBookService.reportVisitorBook(visitorBookId);
    }
}
