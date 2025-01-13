package com.jarvistech.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jarvistech.backend.model.Store;
import com.jarvistech.backend.model.Products.Product;
import com.jarvistech.backend.repository.ProductRepository;
import com.jarvistech.backend.repository.StoreRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private StoreRepository storeRepository;

    public Optional<Product> addProduct(Product product, Integer ownerId) {
        System.out.println(ownerId);
        Store store = storeRepository.findStoreById(ownerId).orElseThrow(() -> new IllegalArgumentException("Store not found"));
        product.setOwner(store);
        Product res = productRepository.save(product);
        return Optional.of(res);
    }
}
