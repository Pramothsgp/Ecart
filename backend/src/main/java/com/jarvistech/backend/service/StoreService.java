package com.jarvistech.backend.service;

import java.lang.StackWalker.Option;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jarvistech.backend.model.Store.Store;
import com.jarvistech.backend.model.Store.StoreAndProduct;
import com.jarvistech.backend.repository.StoreRepository;

@Service
public class StoreService {

    @Autowired
    private StoreRepository storeRepository;

    public Optional<StoreAndProduct> getStore(Integer id) {
        return storeRepository.findById(id);
    }

    public Optional<Store> getStoreDetails(Integer id) {
        return storeRepository.findStoreDetailsById(id);
    }
}
