package com.jarvistech.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jarvistech.backend.model.Store.Store;
import com.jarvistech.backend.model.Store.StoreAndProduct;
import com.jarvistech.backend.model.user.Address;
import com.jarvistech.backend.model.user.User;
import com.jarvistech.backend.repository.AddressRepository;
import com.jarvistech.backend.repository.AuthRepository;
import com.jarvistech.backend.repository.StoreRepository;

@Service
public class StoreService {

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private AddressRepository addressRepository;

    public Optional<StoreAndProduct> getStore(Integer id) {
        return storeRepository.findById(id);
    }

    public Optional<Store> getStoreDetails(Integer id) {
        return storeRepository.findStoreDetailsById(id);
    }

    public Optional<Iterable<Store>> getAllStores() {
        return Optional.of(storeRepository.findAllStores());
    }

    public StoreAndProduct createStore(StoreAndProduct store) {
        User user = authRepository.findById(store.getUser().getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole("SUPPLIER");
        store.setUser(authRepository.save(user));
        if (store.getAddress() != null) {
            store.setAddress(addressRepository.findById(store.getAddress().getId()).orElseGet(() -> {
                if (store.getAddress().getCity() != null) {
                    addressRepository.save(store.getAddress());
                }
                return store.getAddress();
            }));
        }

        return storeRepository.save(store);
    }


    public StoreAndProduct updateStore(StoreAndProduct store) {
        if (store.getId() == null || !storeRepository.existsById(store.getId())) {
            throw new RuntimeException("Store not found");
        }
        return storeRepository.save(store);
    }

    public StoreAndProduct updateAddress(Address address , Integer id) {
        StoreAndProduct store = storeRepository.findStoreById(id).orElseThrow(() -> new RuntimeException("Store not found"));
    
        store.setAddress(addressRepository.save(address));
        StoreAndProduct res =  storeRepository.save(store);
        res.setProducts(null);
        return res;
    }
}
