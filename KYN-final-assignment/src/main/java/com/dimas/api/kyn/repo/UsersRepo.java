package com.dimas.api.kyn.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dimas.api.kyn.dao.Users;

@Repository
public interface UsersRepo extends JpaRepository<Users, Long>{
	
	// for login user detail
	Optional<Users> findByEmail(String email);
	
	// to check duplicate email
	Boolean existsByEmail(String email);

}
