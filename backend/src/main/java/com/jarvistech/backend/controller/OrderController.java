package com.jarvistech.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jarvistech.backend.model.deliveryAgent.DeliveryAgentLocation;
import com.jarvistech.backend.model.order.Orders;
import com.jarvistech.backend.model.user.UserWithOrders;
import com.jarvistech.backend.service.OrderService;
import com.jarvistech.backend.service.TrackerService;

@CrossOrigin
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private TrackerService trackerService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/update-location")
    public ResponseEntity<?> updateLocation(@RequestBody DeliveryAgentLocation location) {

        trackerService.sendLocationUpdate(location);
        return ResponseEntity.ok("Location updated");
    }

    @PostMapping("/place-order")
    public ResponseEntity<?> placeOrder(@RequestBody Orders order) {
        try{
            orderService.placeOrder(order);
            return ResponseEntity.ok("Order placed successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }   
    }

    @GetMapping("/get-orders-details")
    public ResponseEntity<?> getOrders(@RequestParam Long userId) {
        return ResponseEntity.ok(orderService.getOrders(userId));
    }
    
    @GetMapping("/get-orders")
    public UserWithOrders getUserWithOrders(@RequestParam Long userId) {
        return orderService.getUserWithOrders(userId);
    }

    @DeleteMapping("/cancel-order")
    public ResponseEntity<?> cancelOrder(@RequestParam Long orderId) {
        try{
            orderService.cancelOrder(orderId);
            return ResponseEntity.ok("Order cancelled successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
