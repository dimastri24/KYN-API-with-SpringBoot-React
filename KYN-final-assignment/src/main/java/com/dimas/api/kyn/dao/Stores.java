package com.dimas.api.kyn.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Stores {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long storeId;
	
	@Column(nullable = false)
	private String storeName;
	
	private String contactEmail;
	
	@Column(nullable = false)
	private String contactPhone;
	
	@Column(nullable = false)
	private String storeAddress;
	
	private String locationProvince;
	
	private String LocationCity;
	
	private String StoreRating;
	
	private String storeDesc;

	public long getStoreId() {
		return storeId;
	}

	public void setStoreId(long storeId) {
		this.storeId = storeId;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public String getContactEmail() {
		return contactEmail;
	}

	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;
	}

	public String getContactPhone() {
		return contactPhone;
	}

	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}

	public String getStoreAddress() {
		return storeAddress;
	}

	public void setStoreAddress(String storeAddress) {
		this.storeAddress = storeAddress;
	}

	public String getLocationProvince() {
		return locationProvince;
	}

	public void setLocationProvince(String locationProvince) {
		this.locationProvince = locationProvince;
	}

	public String getLocationCity() {
		return LocationCity;
	}

	public void setLocationCity(String locationCity) {
		LocationCity = locationCity;
	}

	public String getStoreRating() {
		return StoreRating;
	}

	public void setStoreRating(String storeRating) {
		StoreRating = storeRating;
	}

	public String getStoreDesc() {
		return storeDesc;
	}

	public void setStoreDesc(String storeDesc) {
		this.storeDesc = storeDesc;
	}
	
	

}
