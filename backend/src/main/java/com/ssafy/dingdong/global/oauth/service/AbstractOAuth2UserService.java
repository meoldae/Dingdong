package com.ssafy.dingdong.global.oauth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.dingdong.global.oauth.converter.ProviderUserConverter;
import com.ssafy.dingdong.global.oauth.converter.ProviderUserRequest;
import com.ssafy.dingdong.global.oauth.model.ProviderUser;

import lombok.Getter;

@Service
@Getter
public abstract class AbstractOAuth2UserService {

    @Autowired
    private ProviderUserConverter<ProviderUserRequest, ProviderUser> providerUserConverter;

    protected ProviderUser providerUser(ProviderUserRequest providerUserRequest) {
        return providerUserConverter.convert(providerUserRequest);
    }
}
