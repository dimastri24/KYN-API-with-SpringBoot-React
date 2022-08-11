package com.dimas.api.kyn.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dimas.api.kyn.dao.Stores;
import com.dimas.api.kyn.repo.StoresRepo;

@Service
@Transactional
public class StoresServiceImpl implements StoresService{
	
	@Autowired
	private StoresRepo storesRepo;

	@Override
	public List<Stores> viewAllStores() {
		return storesRepo.findAll();
	}

	@Override
	public void addStore(Stores store) {
		storesRepo.save(store);
	}

	@Override
	public Optional<Stores> getById(long id) {
		return storesRepo.findById(id);
	}

	@Override
	public void deleteById(long id) {
		storesRepo.deleteById(id);
	}

	@Override
	public List<Stores> getStoresByKey(String key) {
		return storesRepo.searchBykey(key);
	}

	@Override
	public void updateStore(long id, Stores store) {
		Stores edit = storesRepo.findById(id).get();
		edit.setContactEmail(store.getContactEmail());
		edit.setContactPhone(store.getContactPhone());
		edit.setLocationCity(store.getLocationCity());
		edit.setLocationProvince(store.getLocationProvince());
		edit.setStoreAddress(store.getStoreAddress());
		edit.setStoreDesc(store.getStoreDesc());
		edit.setStoreName(store.getStoreName());
		edit.setStoreRating(store.getStoreRating());
		storesRepo.save(edit);
	}
	
//	public Stores getStore(long storeId) {
//		return storesRepo.findById(storeId)
//				.orElseThrow(() -> new BadRequestException("Sorry. We couldn't find any related store")); 
//	}

}
