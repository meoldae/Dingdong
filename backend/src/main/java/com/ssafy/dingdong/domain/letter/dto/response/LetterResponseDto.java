package com.ssafy.dingdong.domain.letter.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class LetterResponseDto {
    private Boolean anonymousFlag;
    private String description;
    private String letterFrom;
    private String letterTo;
    private String stampImgUrl;
    private String stampDescription;
    private LocalDateTime createTime;
}
