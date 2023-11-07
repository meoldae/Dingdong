package com.ssafy.dingdong.domain.visitorbook.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VisitorBookRequestDto {
    private Long roomId;
    private String description;
    private int color;
    private int rotate;

}
