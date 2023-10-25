package com.ssafy.dingdong.domain.neighbor.dto.request;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.PositiveOrZero;

public record NeighborRequest(
	@PositiveOrZero
	Long neighborId,
	@Pattern(regexp = "^[YN]$")
	String flag
) {

}
