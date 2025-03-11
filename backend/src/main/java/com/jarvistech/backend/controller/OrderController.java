package com.jarvistech.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jarvistech.backend.model.deliveryAgent.DeliveryAgentLocation;
import com.jarvistech.backend.model.order.Orders;
import com.jarvistech.backend.model.user.UserWithOrders;
import com.jarvistech.backend.service.DeliveryAgentService;
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

    @Autowired
    private DeliveryAgentService deliveryAgentService;


    @PostMapping("/update-location")
    public ResponseEntity<?> updateLocation(@RequestBody DeliveryAgentLocation location) {

        trackerService.sendLocationUpdate(location);
        return ResponseEntity.ok("Location updated " + location);
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

    @GetMapping("/get-user-orders")
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

    @GetMapping("/get-order-details")
    public ResponseEntity<?> getOrderDetails(@RequestParam Long orderId) {
        return orderService.getOrderDetails(orderId)
                .map(order -> ResponseEntity.ok(order))
                .orElse(ResponseEntity.badRequest().build());
    }

    @PutMapping("/update-order")
    public ResponseEntity<?> updateOrder(@RequestParam List<Long> orderIds, @RequestParam String status) {
        try{
            return ResponseEntity.ok(orderService.updateOrder(orderIds, status));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update-order-for-delivery")
    public ResponseEntity<?> updateOrder(@RequestParam List<Long> orderId,
            @RequestBody DeliveryAgentLocation location) {
        try{
            return ResponseEntity.ok(orderService.updateOrder(orderId, location));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/get-agent-orders")
    public ResponseEntity<?> getAgentOrders(@RequestParam Long agentId) {
        try {
            return ResponseEntity.ok(deliveryAgentService.getDeliveryAgentDetails(agentId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
