package com.jarvistech.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jarvistech.backend.model.Store.Store;
import com.jarvistech.backend.model.Store.StoreAndProduct;
import com.jarvistech.backend.service.StoreService;

@CrossOrigin
@RestController
@RequestMapping("/api/stores")
public class StoreController {

    @Autowired
    private StoreService storeService;

    @GetMapping("/get-store/{id}")
    public ResponseEntity<StoreAndProduct> getStore(@PathVariable Integer id) {
        System.out.println(id);
        return storeService.getStore(id)
                .map( store -> ResponseEntity.ok(store))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/get-store-details/{id}")
    public ResponseEntity<Store> getStoreDetails(@PathVariable Integer id) {
        return storeService.getStoreDetails(id)
                .map(store -> ResponseEntity.ok(store))
                .orElse(ResponseEntity.notFound().build());
    }
}
