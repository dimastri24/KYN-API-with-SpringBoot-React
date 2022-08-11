package com.dimas.api.kyn.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dimas.api.kyn.dao.Stores;

@Service
@Transactional
public interface StoresService {
	
	List<Stores> viewAllStores();
	void addStore(Stores store);
	Optional<Stores> getById(long id);
	void deleteById(long id);
	List<Stores> getStoresByKey(String key);
	void updateStore(long id, Stores store);

}
