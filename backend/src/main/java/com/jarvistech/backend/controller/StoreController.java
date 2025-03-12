package com.jarvistech.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jarvistech.backend.model.Store.Store;
import com.jarvistech.backend.model.Store.StoreAndProduct;
import com.jarvistech.backend.model.user.Address;
import com.jarvistech.backend.service.StoreService;
import com.jarvistech.backend.dto.Message;


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

    @GetMapping("/get-all-stores")
    public ResponseEntity<Iterable<Store>> getAllStores() {
        return ResponseEntity.ok(storeService.getAllStores().get());
    }

    @PostMapping("/create-store")
    public ResponseEntity<?> createStore(@RequestBody StoreAndProduct store) {
        try{
            return ResponseEntity.ok(storeService.createStore(store));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new Message(e.getMessage()));
        }
    }

    @PutMapping("/update-store")
    public ResponseEntity<?> updateStore(@RequestBody StoreAndProduct store) {
        try{
            return ResponseEntity.ok(storeService.updateStore(store));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new Message(e.getMessage()));
        }
    }

    @PutMapping("update-address/{id}")
    public ResponseEntity<?> updateAddress(@PathVariable Integer id, @RequestBody Address address) {
        try{
            return ResponseEntity.ok(storeService.updateAddress( address , id));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new Message(e.getMessage()));
        }
    }
}
