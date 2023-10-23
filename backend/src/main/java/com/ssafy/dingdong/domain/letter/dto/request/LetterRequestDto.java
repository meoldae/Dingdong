package com.ssafy.dingdong.domain.letter.dto.request;

public record LetterRequestDto (String title,
                                String description,
                                Long stampId,
                                String letterTo) {}
