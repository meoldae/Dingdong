package com.ssafy.dingdong.domain.letter.dto.response;

import java.util.UUID;

public record LetterListResponseDto(Long id,
                                    String stampImgUrl,
                                    String nickName,
                                    Boolean isRead,
                                    Boolean isRandom) {}
