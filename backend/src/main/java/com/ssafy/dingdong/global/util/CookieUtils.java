package com.ssafy.dingdong.global.util;

import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

@Component
public class CookieUtils {

	public Optional<Cookie> getCookie(HttpServletRequest request, String name) {
		Cookie[] cookies = request.getCookies();
		if (cookies != null && cookies.length > 0) {
			for (Cookie cookie : cookies) {
				if (name.equals(cookie.getName())) {
					return Optional.ofNullable(cookie);
				}
			}
		}
		return Optional.empty();
	}

	public Cookie createCookie(String refreshToken) {
		Cookie cookie = new Cookie("refreshToken", refreshToken);
		cookie.setPath("/");
		cookie.setHttpOnly(true);
		cookie.setMaxAge(60 * 60 * 24 * 365); // 1년

		return cookie;
	}

	public void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
		Cookie[] cookies = request.getCookies();
		if (cookies != null && cookies.length > 0) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals(name)) {
					cookie.setValue("");
					cookie.setPath("/");
					cookie.setMaxAge(0);
					response.addCookie(cookie);
				}
			}
		}
	}
}
