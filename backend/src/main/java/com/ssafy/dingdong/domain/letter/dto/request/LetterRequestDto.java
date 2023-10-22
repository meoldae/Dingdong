package com.ssafy.dingdong.domain.letter.dto.request;

public record LetterRequestDto (String title,
                                String description,
                                int anonymousFlag,
                                String letterTo) {}
