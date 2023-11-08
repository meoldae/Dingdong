package com.ssafy.dingdong.domain.letter.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LetterAllRequestDto {
    private String description;
    private Long stampId;
    private List<String> memberIdList;
}
