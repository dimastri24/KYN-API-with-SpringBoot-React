package com.dimas.api.kyn.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dimas.api.kyn.dao.Stores;
import com.dimas.api.kyn.exception.BadRequestException;
import com.dimas.api.kyn.payload.CustomResponse;
import com.dimas.api.kyn.service.StoresService;

@RestController
@RequestMapping(value="/kyn/stores")
public class StoresController {
	
	@Autowired
	private StoresService storesService;
	
	@GetMapping
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<Stores> listAllStores(){
		return storesService.viewAllStores();
	}
	
	@GetMapping(value = "/{sid}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public Stores getStoreById(@PathVariable Long sid) {
		return storesService.getById(sid)
				.orElseThrow(() -> new BadRequestException("Store is not exist"));
	}
	
	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> postStore(@RequestBody Stores store) {
		storesService.addStore(store);
		//return new ResponseEntity<>("Store successfully added", HttpStatus.CREATED) ;
		return ResponseEntity.ok(new CustomResponse("Store successfully added", HttpStatus.CREATED));
	}
	
	@DeleteMapping(value = "/{sid}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteStore(@PathVariable Long sid){
		storesService.deleteById(sid);
		//return new ResponseEntity<>("Store successfully deleted", HttpStatus.OK) ;
		return ResponseEntity.ok(new CustomResponse("Store successfully deleted", HttpStatus.OK));
	}
	
	@PutMapping(value = "/{sid}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> editStore(@PathVariable Long sid, @RequestBody Stores store){
		storesService.updateStore(sid, store);
		//return new ResponseEntity<>("Store successfully updated", HttpStatus.NO_CONTENT) ;
		return ResponseEntity.ok(new CustomResponse("Store successfully updated", HttpStatus.NO_CONTENT));
	}
	
	@GetMapping(value = "/search")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public List<Stores> getListStoresByKey(@RequestParam String key){
		return storesService.getStoresByKey(key);
	}

}
