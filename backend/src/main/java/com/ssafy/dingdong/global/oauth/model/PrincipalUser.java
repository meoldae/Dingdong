package com.ssafy.dingdong.global.oauth.model;

import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;

import lombok.Getter;

@Getter
public class PrincipalUser implements OAuth2User, OidcUser {

	private ProviderUser providerUser;

	public PrincipalUser(ProviderUser providerUser) {
		this.providerUser = providerUser;
	}

	@Override
	public Map<String, Object> getClaims() {
		return null;
	}

	@Override
	public OidcUserInfo getUserInfo() {
		return null;
	}

	@Override
	public OidcIdToken getIdToken() {
		return null;
	}

	@Override
	public Map<String, Object> getAttributes() {
		return providerUser.getAttributes();
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return providerUser.getAuthorities();
	}

	@Override
	public String getName() {
		return providerUser.getUsername();
	}

	public ProviderUser getProviderUser() {
		return providerUser;
	}
}
