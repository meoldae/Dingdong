package com.ssafy.dingdong.domain.letter.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;

public record LetterResponseDto(Integer anonymousFlag,
                                String description,
                                UUID letterFrom,
                                UUID letterTo,
                                String stampImgUrl,
                                String stampDescription,
                                LocalDateTime createTime) {}
