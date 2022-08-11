package com.dimas.api.kyn.controller;

import java.net.URI;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.dimas.api.kyn.dao.AuthProvider;
import com.dimas.api.kyn.dao.RoleName;
import com.dimas.api.kyn.dao.Roles;
import com.dimas.api.kyn.dao.Users;
import com.dimas.api.kyn.exception.AppException;
import com.dimas.api.kyn.exception.BadRequestException;
import com.dimas.api.kyn.jwtsecurity.TokenProvider;
import com.dimas.api.kyn.payload.Login;
import com.dimas.api.kyn.payload.LoginResponse;
import com.dimas.api.kyn.payload.Register;
import com.dimas.api.kyn.payload.RegisterResponse;
import com.dimas.api.kyn.repo.RolesRepo;
import com.dimas.api.kyn.service.UsersService;

@RestController
@RequestMapping("/kyn/auth")
public class AuthController {
	
	@Autowired
	private UsersService usersService;
	
	@Autowired
	private RolesRepo rolesRepo;
	
	@Autowired
	private TokenProvider tokenProvider;
	
	@Autowired 
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@PostMapping(value = "/register")
	public ResponseEntity<?> registerUser(@RequestBody Register register){
		if(usersService.getByEmail(register.getEmail()) == true) {
			throw new BadRequestException("Email has already registered before so kindly try another email");
			//return ResponseEntity.status(HttpStatus.CONFLICT).body("Failed to add the user");
		}
		
		Users user = new Users();
		user.setUserName(register.getUserName());
		user.setEmail(register.getEmail());
		user.setProvider(AuthProvider.local);
		//user.setRoles(new HashSet<>(rolesRepo.findBySpecificRoles("USER")));
		
		Roles userRole = rolesRepo.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new AppException("User Role not set."));

        user.setRoles(Collections.singleton(userRole));
		user.setPassword(register.getPassword());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		usersService.addUser(user);
		
		//Users user = usersService.addUser(register);
		
		URI location = ServletUriComponentsBuilder
				.fromCurrentContextPath().path("/users/me")
				.buildAndExpand(user.getUserId()).toUri();
		
		return ResponseEntity.created(location)
				.body(new RegisterResponse(true, "User has successfully registered!!!"));
//		return ResponseEntity
//				.status(HttpStatus.CREATED)
//				.body("User has successfully registered!");
	}
	
	//Local Login
	@PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Login login) {

		//Checking Authentication 
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                		login.getEmail(),
                		login.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        //If authorized user, create token
        String token = tokenProvider.createToken(authentication);
        
        //Return to LoginResponse Payload
        return ResponseEntity.ok(new LoginResponse(token));
    }

}
