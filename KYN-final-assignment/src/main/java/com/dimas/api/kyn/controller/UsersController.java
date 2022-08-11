package com.dimas.api.kyn.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dimas.api.kyn.dao.Users;
import com.dimas.api.kyn.exception.ResourceNotFoundException;
import com.dimas.api.kyn.payload.CustomResponse;
import com.dimas.api.kyn.repo.UsersRepo;
import com.dimas.api.kyn.service.UsersPrincipal;
import com.dimas.api.kyn.service.UsersService;

@RestController
@RequestMapping(value="/kyn/users")
public class UsersController {
	
	@Autowired
	private UsersRepo usersRepo;
	
	@Autowired
	private UsersService usersService;
	
	//Profile API <<Get Current User Profile>>
    @GetMapping("/me")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public Users getUser(@CurrentUser UsersPrincipal usersPrincipal) {
    	
    	return usersRepo.findById((usersPrincipal.getUserId())) 
                .orElseThrow(() -> new ResourceNotFoundException("Users", "userId", usersPrincipal.getUserId()));
    }
    
    @PutMapping("/me/{uid}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> editProfile(@RequestBody Users users, @PathVariable Long uid){
    	usersService.updateUser(uid, users);
    	return ResponseEntity.ok(new CustomResponse("User successfully updated", HttpStatus.NO_CONTENT));
    }

}
