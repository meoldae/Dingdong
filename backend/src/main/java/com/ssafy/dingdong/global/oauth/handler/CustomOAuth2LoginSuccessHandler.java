package com.ssafy.dingdong.global.oauth.handler;

import java.io.IOException;
import java.time.LocalDateTime;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.ssafy.dingdong.domain.member.entity.Member;
import com.ssafy.dingdong.domain.member.repository.MemberRepository;
import com.ssafy.dingdong.domain.member.service.MemberService;
import com.ssafy.dingdong.global.oauth.model.PrincipalUser;
import com.ssafy.dingdong.global.oauth.model.ProviderUser;
import com.ssafy.dingdong.global.util.CookieUtils;
import com.ssafy.dingdong.global.util.JwtProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Component
@RequiredArgsConstructor
public class CustomOAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private static final String REDIRECT_ENDPOINT = "https://ding-dong.kr";

	private final MemberRepository memberRepository;
	private final MemberService memberService;
	private final JwtProvider jwtProvider;
	private final CookieUtils cookieUtils;

	private String redirectUrl;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws
		IOException {
		PrincipalUser principalUser = (PrincipalUser)authentication.getPrincipal();
		ProviderUser providerUser = principalUser.getProviderUser();

		memberRepository.findByEmail(providerUser.getEmail()).ifPresentOrElse(
			findMember -> {
				// 탈퇴한 회원일 때
				// Todo : UUID를 전달해주는게 맞는가?
				if (findMember.getExitTime() != null) {
					redirectUrl = REDIRECT_ENDPOINT + "/rejoin" + findMember.getMemberId();
				}else {
					// 닉네임 O, 캐릭터 선택 O
					if (findMember.getCharacterId() != null && findMember.getNickname() != null) {
						String accessToken = jwtProvider.createAccessToken(findMember);
						String refreshToken = jwtProvider.createRefreshToken();

						Cookie cookie = cookieUtils.createCookie(refreshToken);
						response.addCookie(cookie);

						// AccessToken RefreshToken 저장
						memberService.login(findMember.getMemberId().toString(), accessToken, refreshToken);

						redirectUrl = REDIRECT_ENDPOINT + "/oauth2/redirect?token=" + accessToken;
					}
					// 닉네임, 캐릭터 둘 중 하나라도 없다면
					else {
						redirectUrl = REDIRECT_ENDPOINT + "/signup?memberId=" + findMember.getMemberId();
					}
				}
			},
			// 비회원일 경우
			() -> {
				Member member = Member.builder()
					.username(providerUser.getUsername())
					.provider(providerUser.getProvider())
					.email(providerUser.getEmail())
					.createTime(LocalDateTime.now()).build();
				memberRepository.save(member);

				// TODO : Login 로직 구현된 후 제거될 임시 로직
				String accessToken = jwtProvider.createAccessToken(member);
				String refreshToken = jwtProvider.createRefreshToken();
				memberService.login(member.getMemberId().toString(), accessToken, refreshToken);


				redirectUrl = REDIRECT_ENDPOINT + "/signup?memberId=" + member.getMemberId();
			}
		);
		getRedirectStrategy().sendRedirect(request, response, redirectUrl);
	}
}