package com.ssafy.dingdong.domain.letter.dto.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LetterSNSRequestDto {
    private String letterId;
    private Long roomId;
    private String letterTo;
    private String description;
    private String letterFrom;
    private Long stampId;
}
