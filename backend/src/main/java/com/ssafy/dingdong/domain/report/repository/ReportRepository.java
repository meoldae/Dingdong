package com.ssafy.dingdong.domain.report.repository;

import com.ssafy.dingdong.domain.report.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    long countByReportTo(String reportTo);
}
