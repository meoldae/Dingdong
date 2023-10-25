package com.ssafy.dingdong.domain.avatar.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AvatarListResponseDto {
    private Long id;
    private String thumbUrl;
}
