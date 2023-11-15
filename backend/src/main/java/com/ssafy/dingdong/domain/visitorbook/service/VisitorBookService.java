package com.ssafy.dingdong.domain.visitorbook.service;

import com.ssafy.dingdong.domain.visitorbook.dto.request.VisitorBookRequestDto;
import com.ssafy.dingdong.domain.visitorbook.dto.response.VisitorBookResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface VisitorBookService {
    List<VisitorBookResponseDto> getVisitorBookList(Long roomId);
    VisitorBookResponseDto getVisitorBookDetail(Long visitorBookId);
    void sendVisitorBook(String memberId, VisitorBookRequestDto requestDto);
    void sendVisitorBookGuest(String memberId, String ipAddress, VisitorBookRequestDto requestDto);
    String getVisitorBookFromById(Long visitorBookId);
    void reportVisitorBook(Long visitorBookId);
}
