package com.ssafy.dingdong.global.oauth.handler;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomOAuth2LoginFailureHandler extends SimpleUrlAuthenticationFailureHandler {

	@Value("${auth.redirectUrl}")
	private String redirectURL;

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
		getRedirectStrategy().sendRedirect(request, response, redirectURL);
	}
}
