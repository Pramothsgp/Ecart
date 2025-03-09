package com.jarvistech.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jarvistech.backend.model.Products.Product;
import com.jarvistech.backend.model.cart.Cart;
import com.jarvistech.backend.model.user.User;
import com.jarvistech.backend.repository.AuthRepository;
import com.jarvistech.backend.repository.CartRepository;
import com.jarvistech.backend.repository.ProductRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired 
    private AuthRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public Cart addToCart(Long userId , Long productId , Integer quantity) {

        if(!userRepository.existsById(userId)){
            throw new RuntimeException("User not found");
        }

        if(!productRepository.existsById(productId)){
            throw new RuntimeException("Product not found");
        }
        
        Optional<Cart> existingCart = cartRepository.findByUserIdAndProductId(userId, productId);
        // Optional<Cart> existingCart = cartRepository.findByUserAndProduct(user, product);
        if(existingCart.isPresent()){
            Cart cart = existingCart.get();
            cart.setQuantity(quantity);
            Cart resCart  = cartRepository.save(cart);
            resCart.getProduct().setImage(null);
            return resCart;
        } else {
            User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
    
            Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));
            Cart cart = new Cart();
            cart.setUser(user);
            cart.setProduct(product);
            cart.setQuantity(quantity);
            Cart resCart  = cartRepository.save(cart);
            resCart.getProduct().setImage(null);
            return resCart;
        }
    }

    public List<Cart> getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public void deleteCartById(Long cartId) {
        cartRepository.deleteById(cartId);
    }

    public Cart updateCart(Cart cart) {
        return cartRepository.save(cart);
    }
}