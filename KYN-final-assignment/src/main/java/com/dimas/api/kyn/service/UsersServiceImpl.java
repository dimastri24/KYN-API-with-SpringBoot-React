package com.dimas.api.kyn.service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dimas.api.kyn.dao.AuthProvider;
import com.dimas.api.kyn.dao.RoleName;
import com.dimas.api.kyn.dao.Roles;
import com.dimas.api.kyn.dao.Users;
import com.dimas.api.kyn.exception.AppException;
import com.dimas.api.kyn.exception.ResourceNotFoundException;
import com.dimas.api.kyn.payload.Register;
import com.dimas.api.kyn.repo.RolesRepo;
import com.dimas.api.kyn.repo.UsersRepo;

@Service
@Transactional
public class UsersServiceImpl implements UsersService, UserDetailsService{
	
	@Autowired
	private UsersRepo usersRepo;
	
	@Autowired
	private RolesRepo rolesRepo;
	
//	@Autowired
//	private PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Users users = usersRepo.findByEmail(email)
		.orElseThrow(() -> new UsernameNotFoundException("This email cannot be found" + email));
		return UsersPrincipal.createUser(users);
	}

	@Override
	public UserDetails loadUserById(long userId) {
		Users users = usersRepo.findById(userId)
		.orElseThrow( () -> new ResourceNotFoundException("Users", "userId", userId));
		
		return UsersPrincipal.createUser(users);
	}

//	@Override
//	public Users addUser(Register register) {
//		Users user = new Users();
//		user.setUserName(register.getUserName());
//		user.setEmail(register.getEmail());
//		user.setProvider(AuthProvider.local);
//		//user.setRoles(new HashSet<>(rolesRepo.findBySpecificRoles("USER")));
//		
//		Roles userRole = rolesRepo.findByName(RoleName.ROLE_USER)
//                .orElseThrow(() -> new AppException("User Role not set."));
//
//        user.setRoles(Collections.singleton(userRole));
//		
//        user.setPassword(register.getPassword());
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//		//user.setPassword(passwordEncoder.encode(register.getPassword()));
//		
//		return usersRepo.save(user);
//	}
	
//	@Override
//	public Users addUser(Users register) {
//		Users user = new Users();
//		user.setUserName(register.getUserName());
//		user.setEmail(register.getEmail());
//		user.setProvider(AuthProvider.local);
//		//user.setRoles(new HashSet<>(rolesRepo.findBySpecificRoles("USER")));
//		
//		Roles userRole = rolesRepo.findByName(RoleName.ROLE_USER)
//                .orElseThrow(() -> new AppException("User Role not set."));
//
//        user.setRoles(Collections.singleton(userRole));
//		
////        user.setPassword(register.getPassword());
////        user.setPassword(passwordEncoder.encode(user.getPassword()));
//		//user.setPassword(passwordEncoder.encode(register.getPassword()));
//		
//		return usersRepo.save(user);
//	}
	
	@Override
	public Users addUser(Users user) {
		
		return usersRepo.save(user);
	}

	@Override
	public Boolean getByEmail(String email) {
		if(usersRepo.existsByEmail(email)) {
			return true;
		}
		return false;
	}

	@Override
	public void updateUser(long userId, Users user) {
		Users edit = usersRepo.findById(userId).get();
		edit.setUserName(user.getUserName());
		edit.setAddress(user.getAddress());
		edit.setContactPhone(user.getContactPhone());
		usersRepo.save(edit);
		
	}

}
