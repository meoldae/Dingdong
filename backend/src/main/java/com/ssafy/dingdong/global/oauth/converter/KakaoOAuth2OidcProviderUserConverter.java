package com.ssafy.dingdong.global.oauth.converter;

import org.springframework.security.oauth2.core.oidc.user.OidcUser;

import com.ssafy.dingdong.global.oauth.enums.SocialProvider;
import com.ssafy.dingdong.global.oauth.model.ProviderUser;
import com.ssafy.dingdong.global.oauth.model.social.KakaoOidcUser;
import com.ssafy.dingdong.global.util.OAuth2Utils;

public class KakaoOAuth2OidcProviderUserConverter implements ProviderUserConverter<ProviderUserRequest, ProviderUser> {

	@Override
	public ProviderUser convert(ProviderUserRequest providerUserRequest) {
		if (!providerUserRequest.getClientRegistration()
			.getRegistrationId()
			.equals(SocialProvider.KAKAO.getSocialProvider())) {
			return null;
		}

		if (!(providerUserRequest.getOAuth2User() instanceof OidcUser)) {
			return null;
		}

		return new KakaoOidcUser(
			OAuth2Utils.getMainAttributes(
				providerUserRequest.getOAuth2User()),
			providerUserRequest.getOAuth2User(),
			providerUserRequest.getClientRegistration());
	}
}
