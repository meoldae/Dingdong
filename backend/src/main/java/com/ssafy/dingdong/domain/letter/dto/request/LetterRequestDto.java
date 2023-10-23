package com.ssafy.dingdong.domain.letter.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
@Data
@AllArgsConstructor
public class LetterRequestDto {
    private String title;
    private String description;
    private Long stampId;
    private String letterTo;
}
