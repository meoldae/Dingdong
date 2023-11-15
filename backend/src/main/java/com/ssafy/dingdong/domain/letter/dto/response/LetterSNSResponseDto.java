package com.ssafy.dingdong.domain.letter.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LetterSNSResponseDto {
    private Long roomId;
    private String letterTo;
    private String description;
    private String letterFrom;
    private String stampUrl;
}
