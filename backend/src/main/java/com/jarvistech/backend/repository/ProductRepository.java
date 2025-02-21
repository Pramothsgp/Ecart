package com.jarvistech.backend.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jarvistech.backend.model.Products.Product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p JOIN FETCH p.owner WHERE p.owner.id = :ownerId")
    List<Product> findProductsByOwnerId(@Param("ownerId") Integer ownerId);
}

