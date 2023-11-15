package com.ssafy.dingdong.domain.letter.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LetterRequestDto {
    private String nickName;
    private String description;
    private Long stampId;
    private Long roomId;
}
