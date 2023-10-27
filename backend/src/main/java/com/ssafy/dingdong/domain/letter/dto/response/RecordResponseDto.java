package com.ssafy.dingdong.domain.letter.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@Builder
@ToString
public class RecordResponseDto {
    String memberId;
    int count;
}
