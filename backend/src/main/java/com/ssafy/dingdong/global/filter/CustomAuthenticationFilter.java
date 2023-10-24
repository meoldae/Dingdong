package com.ssafy.dingdong.global.filter;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ssafy.dingdong.domain.member.entity.Member;
import com.ssafy.dingdong.domain.member.repository.MemberRedisRepository;
import com.ssafy.dingdong.domain.member.repository.MemberRepository;
import com.ssafy.dingdong.global.exception.CustomException;
import com.ssafy.dingdong.global.exception.ExceptionStatus;
import com.ssafy.dingdong.global.util.JwtProvider;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@AllArgsConstructor
public class CustomAuthenticationFilter extends OncePerRequestFilter {
	private JwtProvider jwtProvider;
	private MemberRepository memberRepository;
	private MemberRedisRepository memberRedisRepository;

	public static final String TOKEN_EXCEPTION_KEY = "exception";
	public static final String TOKEN_INVALID = "invalid";
	public static final String TOKEN_EXPIRE = "expire";
	public static final String TOKEN_UNSUPPORTED = "unsupported";
	public static final String TOKEN_ILLEGAL = "illegal";
	public static final String CUSTOM_EXCEPTION = "custom";
	public static final String TOKEN_DOES_NOT_EXIST = "null";

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain) throws
		ServletException, IOException {
		try {
			String accessToken = jwtProvider.getAccessToken(request);
			if (StringUtils.hasText(accessToken) && jwtProvider.validateToken(accessToken)) {

				if (jwtProvider.isExpired(accessToken)) {
					throw new CustomException(ExceptionStatus.TOKEN_EXPIRED);
				}

				String memberId = jwtProvider.getClaimFromToken(accessToken, "memberId");

				// 중복 로그인 체크
				if (isDuplicate(memberId, accessToken)) {
					throw new CustomException(ExceptionStatus.LOGOUT);
				}

				Member findMember = memberRepository.findByMemberId(memberId).orElseThrow(
					() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND)
				);

				String mId = String.valueOf(findMember.getMemberId());

				UsernamePasswordAuthenticationToken authentication =
					new UsernamePasswordAuthenticationToken(mId, null, null);

				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}

		} catch (MalformedJwtException e) {
			log.info("유효하지 않은 토큰입니다.");
			request.setAttribute(TOKEN_EXCEPTION_KEY, TOKEN_INVALID);
		} catch (ExpiredJwtException e) {
			log.info("만료된 토큰입니다.");
			request.setAttribute(TOKEN_EXCEPTION_KEY, TOKEN_EXPIRE);
		} catch (UnsupportedJwtException e) {
			log.info("지원하지 않는 토큰입니다.");
			request.setAttribute(TOKEN_EXCEPTION_KEY, TOKEN_UNSUPPORTED);
		} catch (IllegalStateException e) {
			log.info("잘못된 토큰입니다.");
			request.setAttribute(TOKEN_EXCEPTION_KEY, TOKEN_ILLEGAL);
		} catch (CustomException e) {
			log.info("커스텀 예외");
			request.setAttribute(TOKEN_EXCEPTION_KEY, CUSTOM_EXCEPTION);
		} catch (Exception e) {
			request.setAttribute(TOKEN_EXCEPTION_KEY, TOKEN_INVALID);
		}

		filterChain.doFilter(request, response);
	}

	private boolean isDuplicate(String memberId, String accessToken) {
		String olderAccessToken = memberRedisRepository.findByMemberId(memberId).orElse(TOKEN_DOES_NOT_EXIST);
		// 액세스 토큰 X
		if (TOKEN_DOES_NOT_EXIST.equals(olderAccessToken)) {
			return false;
		} else {
			// 액세스 토큰 동일 (정상)
			if (accessToken.equals(olderAccessToken)) {
				return false;
			}
			// 액세스 토큰 다름 (중복 로그인)
			else {
				return true;
			}
		}
	}
}
