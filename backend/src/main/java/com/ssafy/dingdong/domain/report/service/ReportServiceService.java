package com.ssafy.dingdong.domain.report.service;


public interface ReportServiceService {
    void createLetterReport(String memberId, Long letterId);
    void createChatReport(String memberId, Long chatId);
}
