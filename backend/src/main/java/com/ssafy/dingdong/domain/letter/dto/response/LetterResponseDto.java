package com.ssafy.dingdong.domain.letter.dto.response;

import java.time.LocalDateTime;

public record LetterResponseDto (Integer anonymousFlag,
                                 String description,
                                 String letterFrom,
                                 String letterTo,
                                 String stampImgUrl,
                                 String stampDescription,
                                 LocalDateTime createTime) {}
