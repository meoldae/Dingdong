package com.ssafy.dingdong.global.oauth.model;

import java.util.Map;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class Attributes {

	private Map<String, Object> mainAttributes;
	private Map<String, Object> subAttributes;
	private Map<String, Object> otherAttributes;
}
