package com.ssafy.dingdong.domain.cs.entity;

import com.ssafy.dingdong.domain.cs.enums.CsType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Cs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long csId;
    private String memberId;

    @Enumerated(EnumType.STRING)
    private CsType category;

    private String content;
    private LocalDateTime writeTime;

    public static Cs build(String memberId, CsType category, String content) {
        return Cs.builder()
                .memberId(memberId)
                .category(category)
                .content(content)
                .writeTime(LocalDateTime.now())
                .build();
    }
}
