package com.ssafy.dingdong.domain.cs.dto.request;

import com.ssafy.dingdong.domain.cs.enums.CsType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@ToString
public class CustomerRequestDto {
    private String category;
    private String content;
}
