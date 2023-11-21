package com.ssafy.dingdong.domain.multi.mongorepo;

import com.ssafy.dingdong.domain.multi.entity.DailyChatLogs;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ChatLogRepository extends MongoRepository<DailyChatLogs, String> {
    Optional<DailyChatLogs> findByDate(String date);
}
