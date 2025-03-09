package com.jarvistech.backend.service;

import com.jarvistech.backend.model.Products.Product;
import com.jarvistech.backend.model.order.Orders;
import com.jarvistech.backend.model.user.User;
import com.jarvistech.backend.model.user.UserWithOrders;
import com.jarvistech.backend.repository.AuthRepository;
import com.jarvistech.backend.repository.OrderRepository;
import com.jarvistech.backend.repository.ProductRepository;
import com.jarvistech.backend.dto.OrderDetailsDTO;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private AuthRepository userRepository;

    @Transactional
    public Orders placeOrder(Orders order) throws Exception {
        Product product = productRepository.findById(order.getProduct().getId()).orElseThrow(() -> new Exception("Product not found"));
        User user = userRepository.findById(order.getUser().getId()).orElseThrow(() -> new Exception("User not found"));
        if (product.getStock() < order.getQuantity()) {
            throw new Exception("Not enough stock available");
        }
        order.setProduct(product);
        order.setUser(user);
        order.setStatus("Pending");
        order.setTotalPrice(product.getPrice().multiply(new BigDecimal(order.getQuantity())));
        product.setStock(product.getStock() - order.getQuantity());
        productRepository.save(product);
        Optional<Product> product1 = productRepository.findById(product.getId());
        if(product1.get().getStock() < 0){
            throw new Exception("Not enough stock available");
        }
        return orderRepository.save(order);
    }

    @Transactional
    public void cancelOrder(Long orderId) throws Exception {
        Orders order = orderRepository.findById(orderId).orElseThrow(() -> new Exception("Order not found"));
        Product product = productRepository.findById(order.getProduct().getId()).orElseThrow(() -> new Exception("Product not found"));

        product.setStock(product.getStock() + order.getQuantity());
        productRepository.save(product);

        orderRepository.delete(order);
    }

    public List<Orders> getOrders(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public UserWithOrders getUserWithOrders(Long userId) {
        List<Orders> orders = orderRepository.findByUserId(userId);
        List<OrderDetailsDTO> orderDetails = orders.stream()
            .map(order -> new OrderDetailsDTO(
                order.getId(),
                order.getProduct().getProductName(),
                order.getTotalPrice(),
                order.getQuantity(),
                order.getStatus()
            ))
            .collect(Collectors.toList());
        return new UserWithOrders(userId, orderDetails);
    }
}