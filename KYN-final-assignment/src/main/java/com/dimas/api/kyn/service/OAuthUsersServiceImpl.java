package com.dimas.api.kyn.service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dimas.api.kyn.dao.AuthProvider;
import com.dimas.api.kyn.dao.RoleName;
import com.dimas.api.kyn.dao.Roles;
import com.dimas.api.kyn.dao.Users;
import com.dimas.api.kyn.exception.AppException;
import com.dimas.api.kyn.exception.OAuthAuthenticationException;
import com.dimas.api.kyn.oauth2users.OAuth2Users;
import com.dimas.api.kyn.oauth2users.OAuth2UsersFactory;
import com.dimas.api.kyn.repo.RolesRepo;
import com.dimas.api.kyn.repo.UsersRepo;

@Service
@Transactional
public class OAuthUsersServiceImpl extends DefaultOAuth2UserService{
	
	@Autowired
	private UsersRepo usersRepo;
	
	@Autowired
	private RolesRepo rolesRepo;
	
	@Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) throws OAuthAuthenticationException {
        OAuth2Users oAuth2Users = OAuth2UsersFactory.getInstance(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if(org.springframework.util.StringUtils.isEmpty(oAuth2Users.getEmail())) {
            throw new OAuthAuthenticationException("Email not found from OAuth2 provider");
        }

        Optional<Users> userOptional = usersRepo.findByEmail(oAuth2Users.getEmail());
        Users user;
        if(userOptional.isPresent()) {
            user = userOptional.get();
            if(!user.getProvider().equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                throw new OAuthAuthenticationException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
            user = updateExistingUser(user, oAuth2Users);
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2Users);
        }

        return UsersPrincipal.createUser(user, oAuth2User.getAttributes());
    }

    private Users registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2Users oAuth2Users) {
        Users user = new Users();

        user.setProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        user.setProviderId(oAuth2Users.getId());
        user.setUserName(oAuth2Users.getName());
        user.setEmail(oAuth2Users.getEmail());
        //user.setRoles(new HashSet<>(rolesRepo.findBySpecificRoles("USER")));
        
		Roles userRole = rolesRepo.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));
        user.setImgUrl(oAuth2Users.getImageUrl());
        return usersRepo.save(user);
    }

    private Users updateExistingUser(Users existingUser, OAuth2Users oAuth2UserInfo) {
        existingUser.setUserName(oAuth2UserInfo.getName());
        existingUser.setImgUrl(oAuth2UserInfo.getImageUrl());
        return usersRepo.save(existingUser);
    }

}
