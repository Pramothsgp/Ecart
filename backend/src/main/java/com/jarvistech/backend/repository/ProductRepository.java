package com.jarvistech.backend.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.jarvistech.backend.model.Products.Product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("SELECT p FROM Product p JOIN FETCH p.owner WHERE p.owner.id = :ownerId")
    List<Product> findProductsByOwnerId(@Param("ownerId") Integer ownerId);
}

