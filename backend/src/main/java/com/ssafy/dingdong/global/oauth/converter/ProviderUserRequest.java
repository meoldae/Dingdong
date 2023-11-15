package com.ssafy.dingdong.global.oauth.converter;

import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.user.OAuth2User;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ProviderUserRequest {

	private ClientRegistration clientRegistration;
	private OAuth2User oAuth2User;

	@Builder
	public ProviderUserRequest(ClientRegistration clientRegistration, OAuth2User oAuth2User) {
		this.clientRegistration = clientRegistration;
		this.oAuth2User = oAuth2User;
	}



}
