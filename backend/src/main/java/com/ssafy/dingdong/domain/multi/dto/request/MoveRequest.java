package com.ssafy.dingdong.domain.multi.dto.request;

import lombok.Data;

@Data
public class MoveRequest {
    private String UUID;
    private double x;
    private double y;
    private double z;
}
