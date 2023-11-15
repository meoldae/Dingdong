package com.ssafy.dingdong.domain.member.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

public record MemberSignUpDto(
	String memberId,
	@NotBlank(message = "닉네임은 필수 항목입니다.")
	@Length(min = 1, max = 8, message = "닉네임은 1 ~ 8 글자 사이입니다.")
	String nickname,
	@NotNull(message = "캐릭터는 필수 선택항목입니다.")
	Long avatarId
) {

}
