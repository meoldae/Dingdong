package com.ssafy.dingdong.domain.letter.dto.response;

import lombok.*;


@Getter
@ToString
public class LetterScoreDto {
    private String memberId;
    private Long count;

    @Builder
    public LetterScoreDto(String memberId, Long count) {
        this.memberId = memberId;
        this.count = count;
    }
}
