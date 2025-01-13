package com.jarvistech.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jarvistech.backend.model.Store;
import com.jarvistech.backend.service.StoreService;

@CrossOrigin
@RestController
@RequestMapping("/api/stores")
public class StoreController {

    @Autowired
    private StoreService storeService;

    @GetMapping("/get-store/{id}")
    public ResponseEntity<Store> getStore(@PathVariable Integer id) {
        System.out.println(id);
        return storeService.getStore(id)
                .map( store -> ResponseEntity.ok(store))
                .orElse(ResponseEntity.notFound().build());
    }
}
