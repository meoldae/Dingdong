package com.ssafy.dingdong.global.util;

import java.util.Map;

import org.springframework.security.oauth2.core.user.OAuth2User;

import com.ssafy.dingdong.global.oauth.model.Attributes;

public class OAuth2Utils {

	public static Attributes getMainAttributes(OAuth2User oAuth2User) {
		return Attributes.builder()
			.mainAttributes(oAuth2User.getAttributes())
			.build();
	}

	public static Attributes getSubAttributes(OAuth2User oAuth2User, String subAttributesKey) {
		return Attributes.builder()
			.subAttributes((Map<String, Object>)oAuth2User.getAttributes().get(subAttributesKey))
			.build();
	}

	public static Attributes getOtherAttributes(OAuth2User oAuth2User, String subAttributesKey, String otherAttributesKey) {
		Map<String, Object> subAttributes = (Map<String, Object>)oAuth2User.getAttributes().get(subAttributesKey);

		return Attributes.builder()
			.subAttributes(subAttributes)
			.otherAttributes((Map<String, Object>)subAttributes.get(otherAttributesKey))
			.build();
	}
}
