package com.ssafy.dingdong.domain.visitorbook.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VisitorBookResponseDto {
    private Long id;
    private String nickname;
    private String description;
    private LocalDateTime writeTime;
    private int color;
    private int rotate;
}
