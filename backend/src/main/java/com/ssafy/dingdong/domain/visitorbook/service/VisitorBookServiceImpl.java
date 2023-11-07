package com.ssafy.dingdong.domain.visitorbook.service;

import com.ssafy.dingdong.domain.member.service.MemberService;
import com.ssafy.dingdong.domain.room.service.RoomService;
import com.ssafy.dingdong.domain.visitorbook.dto.request.VisitorBookRequestDto;
import com.ssafy.dingdong.domain.visitorbook.dto.response.VisitorBookResponseDto;
import com.ssafy.dingdong.domain.visitorbook.entity.VisitorBook;
import com.ssafy.dingdong.domain.visitorbook.repository.VisitorBookRepository;
import com.ssafy.dingdong.global.exception.CustomException;
import com.ssafy.dingdong.global.exception.ExceptionStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class VisitorBookServiceImpl implements VisitorBookService{
    private final VisitorBookRepository visitorBookRepository;
    private final MemberService memberService;
    private final RoomService roomService;
    @Override
    public List<VisitorBookResponseDto> getVisitorBookList(Long roomId) {
        String memberId = roomService.getMemberIdByRoomId(roomId);
        List<VisitorBookResponseDto> result = visitorBookRepository.findAllByWriteToAndIsReportFalseOrderByWriteTime(memberId);
        return result;
    }

    @Override
    public VisitorBookResponseDto getVisitorBookDetail(Long visitorBookId) {
        VisitorBook visitorBook = visitorBookRepository.findById(visitorBookId).orElseThrow(() -> new CustomException(ExceptionStatus.VISITRROOM_NOT_FOUND));
        String nickname = memberService.getMemberById(visitorBook.getWriteFrom()).nickname();
        VisitorBookResponseDto result = VisitorBookResponseDto.builder()
                .id(visitorBook.getId())
                .nickname(nickname)
                .description(visitorBook.getDescription())
                .writeTime(visitorBook.getWriteTime())
                .color(visitorBook.getColor())
                .rotate(visitorBook.getRotate())
                .build();
        return result;
    }

    @Override
    public void sendVisitorBook(String memberId, VisitorBookRequestDto requestDto) {
        String writeTo = roomService.getMemberIdByRoomId(requestDto.getRoomId());
        VisitorBook visitorBook = VisitorBook.build(requestDto, memberId, writeTo, "");
        visitorBookRepository.save(visitorBook);
    }

    @Override
    public void sendVisitorBookGuest(String memberId, String ipAddress, VisitorBookRequestDto requestDto) {
        String writeTo = roomService.getMemberIdByRoomId(requestDto.getRoomId());
        VisitorBook visitorBook = VisitorBook.build(requestDto, memberId, writeTo, ipAddress);
        visitorBookRepository.save(visitorBook);
    }
}
