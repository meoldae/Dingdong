package com.ssafy.dingdong.global.oauth.model.social;

import java.util.Map;

import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.ssafy.dingdong.global.oauth.model.Attributes;
import com.ssafy.dingdong.global.oauth.model.OAuth2ProviderUser;

public class KakaoUser extends OAuth2ProviderUser {

    Map<String, Object> profileAttribute;

    public KakaoUser(Attributes attributes, OAuth2User oAuth2User, ClientRegistration clientRegistration) {
        super(attributes.getSubAttributes(), oAuth2User, clientRegistration);
        this.profileAttribute = attributes.getOtherAttributes();
    }


    @Override
    public String getId() {
        return (String)getAttributes().get("id");
    }

    @Override
    public String getUsername() {
        return (String)profileAttribute.get("nickname");
    }



}
