package com.jarvistech.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.jarvistech.backend.model.User;
import com.jarvistech.backend.model.Products.Product;
import com.jarvistech.backend.model.cart.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUserId(Long userId);

    // @Query("SELECT c FROM Cart c WHERE c.user.id = :userId AND c.product.id = :productId")
    // Optional<Cart> findByUserIdAndProductId(@Param("userId") Long userId, @Param("productId") Long productId);
    Optional<Cart> findByUserIdAndProductId(Long userId, Long productId);
    Optional<Cart> findByUserAndProduct(User user, Product product);

    
}
