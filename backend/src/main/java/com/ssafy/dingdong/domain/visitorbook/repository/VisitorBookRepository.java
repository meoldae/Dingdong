package com.ssafy.dingdong.domain.visitorbook.repository;

import com.ssafy.dingdong.domain.letter.dto.response.LetterResponseDto;
import com.ssafy.dingdong.domain.visitorbook.dto.response.VisitorBookResponseDto;
import com.ssafy.dingdong.domain.visitorbook.entity.VisitorBook;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface VisitorBookRepository extends JpaRepository<VisitorBook, Long> {
    @Query("SELECT new com.ssafy.dingdong.domain.visitorbook.dto.response.VisitorBookResponseDto(" +
            "v.id, m.nickname, v.description, v.writeTime, v.color, v.rotate) " +
            "FROM VisitorBook v " +
            "Join Member m ON v.writeFrom=m.memberId "+
            "AND v.isReport = false " +
            "WHERE v.writeTo = :memberId " +
            "ORDER BY v.writeTime DESC")
    List<VisitorBookResponseDto> findAllByWriteToAndIsReportFalseOrderByWriteTime(@Param("memberId") String memberId);

    @Query("SELECT new com.ssafy.dingdong.domain.visitorbook.dto.response.VisitorBookResponseDto(" +
            "v.id, mf.nickname, v.description, v.writeTime, v.color, v.rotate) " +
            "from VisitorBook v " +
            "Join Member mf ON v.writeFrom=mf.memberId " +
            "Join Member mt ON v.writeTo=mt.memberId " +
            "WHERE v.writeTo = :memberId AND v.id = :visitorBookId")
    Optional<VisitorBookResponseDto> findByVisitorBookId(@Param("visitorBookId") Long visitorBookId);

}
