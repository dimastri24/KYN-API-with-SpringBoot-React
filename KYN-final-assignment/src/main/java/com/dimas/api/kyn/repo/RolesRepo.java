package com.dimas.api.kyn.repo;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dimas.api.kyn.dao.RoleName;
import com.dimas.api.kyn.dao.Roles;

public interface RolesRepo extends JpaRepository<Roles, Long>{

//	@Query( "select r from Roles r where r.name in :roles" )
//	Set<Roles> findBySpecificRoles(@Param("roles") String role);
	
	Optional<Roles> findByName(RoleName roleName);
}
