package com.dimas.api.kyn.jwtsecurity;

import java.util.Date;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.dimas.api.kyn.config.AppProperties;
import com.dimas.api.kyn.service.UsersPrincipal;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Service
public class TokenProvider {
	
	private AppProperties appProperties;

	public TokenProvider(AppProperties appProperties) {
		this.appProperties = appProperties;
	}
	
	public AppProperties getAppProperties() {
		return appProperties;
	}

	public void setAppProperties(AppProperties appProperties) {
		this.appProperties = appProperties;
	}

	
	public String createToken(Authentication authentication) {
		UsersPrincipal usersPrincipal = (UsersPrincipal) authentication.getPrincipal();
		
		//define expire date
		Date now = new Date();
		Date expireDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpireMsec());
		
		//building with token with JWT
		return Jwts.builder()
				.setSubject(Long.toString(usersPrincipal.getUserId()))
				.setIssuedAt(new Date())
				.setExpiration(expireDate)
				.signWith(SignatureAlgorithm.HS512, appProperties.getAuth().getTokenSecret())
				.compact();
	}
	
	//parse jwt string
	public int getUserIdFromToken(String token) {
		Claims claims = Jwts.parser()
				.setSigningKey(appProperties.getAuth().getTokenSecret())
				.parseClaimsJws(token)
				.getBody();
		
		return Integer.parseInt(claims.getSubject());
	}
	
	//validate token
	public boolean validateToken(String authToken) {
		try {
			Jwts.parser()
			.setSigningKey(appProperties.getAuth().getTokenSecret())
			.parseClaimsJws(authToken);
			return true;
		} catch (ExpiredJwtException e) {
			e.printStackTrace();
		} catch (UnsupportedJwtException e) {
			e.printStackTrace();
		} catch (MalformedJwtException e) {
			e.printStackTrace();
		} catch (SignatureException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		}
		return false;
	}

}
