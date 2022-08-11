package com.dimas.api.kyn.config;

public class Auth {
	
	private String tokenSecret;
	private long tokenExpireMsec;
	
	public String getTokenSecret() {
		return tokenSecret;
	}
	public void setTokenSecret(String tokenSecret) {
		this.tokenSecret = tokenSecret;
	}
	public long getTokenExpireMsec() {
		return tokenExpireMsec;
	}
	public void setTokenExpireMsec(long tokenExpireMsec) {
		this.tokenExpireMsec = tokenExpireMsec;
	}

}
