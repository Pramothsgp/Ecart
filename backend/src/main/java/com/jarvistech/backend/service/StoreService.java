package com.jarvistech.backend.service;

import java.lang.StackWalker.Option;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jarvistech.backend.model.Store;
import com.jarvistech.backend.repository.StoreRepository;

@Service
public class StoreService {

    @Autowired
    private StoreRepository storeRepository;

    public Optional<Store> getStore(Integer id) {
        return storeRepository.findById(id);
    }
}
