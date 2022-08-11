package com.dimas.api.kyn.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app")
public class AppProperties {
	
	private final Auth auth = new Auth();
	private final OAuth2 oAuth2 = new OAuth2();
	
	public Auth getAuth() {
		return auth;
	}
	
	public OAuth2 getoAuth2() {
		return oAuth2;
	}

}
