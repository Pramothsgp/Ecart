package com.jarvistech.backend.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jarvistech.backend.model.deliveryAgent.DeliveryAgent;
import com.jarvistech.backend.model.user.User;
import com.jarvistech.backend.service.AuthService;

@CrossOrigin
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/test")
    public String testString() {
        return "Hello World";
    }

    @GetMapping("/login")
    public ResponseEntity<?> login(@RequestParam String username, @RequestParam String password) {
        return authService.login(username, password)
                .map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.status(401).build());
    }


    @PostMapping("/registerUser")
    public ResponseEntity<?> register(@RequestParam String username, @RequestParam String email,
            @RequestParam String password) {
        return authService.register(username, email, password)
                .map(user -> ResponseEntity.ok(user))
                .orElse(ResponseEntity.status(401).build());
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("image") MultipartFile image) {
        try {
            System.out.println(username);
            authService.register(username, email, password, image);
            return ResponseEntity.ok("Registered successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to register");
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            @RequestParam("newPassword") String newPassword) {
        try {
            User updatedUser = authService.changePassword(username, password, newPassword);
            if (updatedUser != null) {
                return ResponseEntity.ok(updatedUser);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to change password");
            }
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid password");
        }
    }

    @PostMapping("register-delivery-agent")
    public ResponseEntity<?> registerDeliveryAgent(@RequestBody DeliveryAgent deliveryAgent) {
        try {
            return ResponseEntity.ok(authService.registerDeliveryAgent(deliveryAgent));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to register delivery agent");
        }

    }
    
    @GetMapping("/get-delivery-agent")
    public ResponseEntity<?> getDeliveryAgent(@RequestParam Long id) {
        return authService.getDeliveryAgentByUserId(id)
            .map(agent -> ResponseEntity.ok(agent))
            .orElse(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
    }
}
