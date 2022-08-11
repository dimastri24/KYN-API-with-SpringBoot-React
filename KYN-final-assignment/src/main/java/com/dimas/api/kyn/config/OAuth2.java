package com.dimas.api.kyn.config;

import java.util.ArrayList;
import java.util.List;

public class OAuth2 {
	
	private List<String> authorizedRedirectUris = new ArrayList<>();
	
	public List<String> getAuthorizedRedirectUris(){
		return authorizedRedirectUris;
	}
	
	public OAuth2 authorizedRedirectUris(List<String> authorizedRedirectUris) {
		this.authorizedRedirectUris = authorizedRedirectUris;
		return this;
	}

}
