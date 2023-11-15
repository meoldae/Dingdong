package com.ssafy.dingdong.global.oauth.model;

import java.util.List;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

public interface ProviderUser {

    String getId();
    String getUsername();
    String getEmail();
    String getProvider();
    List<? extends GrantedAuthority> getAuthorities();
    Map<String, Object> getAttributes();
    OAuth2User getOAuth2User();
}
