package com.ssafy.dingdong.global.oauth.converter;

public interface ProviderUserConverter<T, R> {

	R convert(T t);

}