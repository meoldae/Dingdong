package com.ssafy.dingdong.domain.report.service;


public interface ReportService {
    void createLetterReport(String memberId, Long letterId);
    void createChatReport(String memberId, Long chatId);
    void createVisitorBookReport(String memberId, Long visitorBookId);
}
