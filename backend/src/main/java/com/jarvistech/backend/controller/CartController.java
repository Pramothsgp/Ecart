package com.jarvistech.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jarvistech.backend.dto.Message;
import com.jarvistech.backend.model.cart.Cart;
import com.jarvistech.backend.service.CartService;

@CrossOrigin
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Add to cart
    @PostMapping("/add-to-cart/{userId}")
    public ResponseEntity<?> addToCart(@PathVariable Long userId , @RequestParam Long productId , @RequestParam Integer quantity) {
        try{
            return ResponseEntity.ok(cartService.addToCart(userId , productId , quantity));
        } catch(RuntimeException e) {
            return ResponseEntity.status(404).body(new Message(e.getMessage()));
        }
    }

    // Update cart quantity
    @PutMapping("/update-cart")
    public ResponseEntity<Cart> updatecart(@RequestBody Cart cart){
        if(cart.getQuantity() <= 0){
            return ResponseEntity.status(204).build();
        }
        return ResponseEntity.ok(cartService.updateCart(cart));
    }
    // Get cart by user id
    @GetMapping("/get-cart/{userId}")
    public ResponseEntity<List<Cart>> getCartByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }

    // Delete cart by id
    @DeleteMapping("/delete-cart/{cartId}")
    public ResponseEntity<String> deleteCartById(@PathVariable Long cartId) {
        cartService.deleteCartById(cartId);
        return ResponseEntity.ok("Cart deleted successfully");
    }
}
