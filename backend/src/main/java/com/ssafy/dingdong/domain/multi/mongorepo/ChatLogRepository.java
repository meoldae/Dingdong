package com.ssafy.dingdong.domain.multi.mongorepo;

import com.ssafy.dingdong.domain.multi.entity.ChatLog;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatLogRepository extends MongoRepository<ChatLog, String> {

}
