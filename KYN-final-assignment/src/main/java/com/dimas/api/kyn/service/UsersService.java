package com.dimas.api.kyn.service;

import org.springframework.security.core.userdetails.UserDetails;

import com.dimas.api.kyn.dao.Users;
import com.dimas.api.kyn.payload.Register;

public interface UsersService {
	
	UserDetails loadUserById(long userId);
	Users addUser(Users user);
	Boolean getByEmail(String email);
	void updateUser(long userId, Users user);
	
}
