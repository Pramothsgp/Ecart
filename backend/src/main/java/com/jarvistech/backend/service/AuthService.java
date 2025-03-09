package com.jarvistech.backend.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.jarvistech.backend.model.deliveryAgent.DeliveryAgent;
import com.jarvistech.backend.model.user.User;
import com.jarvistech.backend.repository.AgentRepository;
import com.jarvistech.backend.repository.AuthRepository;


@Service
public class AuthService {

    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AgentRepository agentRepository;

    public Optional<User> login(String username, String password) {
        return authRepository.findUserByUsernameOrEmail(username, username)
        .filter(user -> passwordEncoder.matches(password, user.getPassword()))
        .map( user -> {
                    user.setPassword(null);
                    return user;
        });
    }

    public Optional<User> register(String username, String email, String password) {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        User savedUser = authRepository.save(user);
        return Optional.of(savedUser);
    }

    public Optional<User> register(String username, String email, String password, MultipartFile image) throws IOException {
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setName(image.getOriginalFilename());
        user.setImage(image.getBytes());
        User savedUser = authRepository.save(user);
        return Optional.of(savedUser);
    }

    public User changePassword(String username, String password, String newPassword) {
        User user = authRepository.findUserByUsernameOrEmail(username, username).orElseThrow(()-> new RuntimeException("User Not Found"));
        
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        user.setPassword(passwordEncoder.encode(newPassword));

        return authRepository.save(user);
    }

    public DeliveryAgent registerDeliveryAgent(DeliveryAgent deliveryAgent) throws RuntimeException{
        if(deliveryAgent.getUser().getId() == null){
            User newUser = new User();
            if (deliveryAgent.getUser().getName() == null || deliveryAgent.getUser().getName().isEmpty()
                    || deliveryAgent.getUser().getPassword() == null
                    || deliveryAgent.getUser().getPassword().isEmpty()
                    || deliveryAgent.getUser().getEmail() == null
                    || deliveryAgent.getUser().getEmail().isEmpty()
                    || deliveryAgent.getUser().getUsername() == null
                    || deliveryAgent.getUser().getUsername().isEmpty()) {
                throw new RuntimeException("Invalid User Details");
            }
            newUser.setUsername(deliveryAgent.getUser().getName());
            newUser.setEmail(deliveryAgent.getUser().getEmail());
            newUser.setPassword(passwordEncoder.encode("password"));
            User user = authRepository.save(newUser);
            deliveryAgent.setUser(user);
            return agentRepository.save(deliveryAgent);
        }
        User user = authRepository.findUserByUsernameOrEmail(deliveryAgent.getUser().getName(), deliveryAgent.getUser().getEmail())
        .orElseGet(() -> {
            User newUser = new User();
            if (deliveryAgent.getUser().getName() == null || deliveryAgent.getUser().getName().isEmpty()
                    || deliveryAgent.getUser().getPassword() == null
                    || deliveryAgent.getUser().getPassword().isEmpty()
                    || deliveryAgent.getUser().getEmail() == null
                    || deliveryAgent.getUser().getEmail().isEmpty()
                    || deliveryAgent.getUser().getUsername() == null
                    || deliveryAgent.getUser().getUsername().isEmpty()) {
                throw new RuntimeException("Invalid User Details");
            }
            newUser.setUsername(deliveryAgent.getUser().getName());
            newUser.setEmail(deliveryAgent.getUser().getEmail());
            newUser.setPassword(passwordEncoder.encode("password"));
            return authRepository.save(newUser);
        });

        deliveryAgent.setUser(user);

        return agentRepository.save(deliveryAgent);
    }

    public Optional<DeliveryAgent> getDeliveryAgentByUserId(Long userId) {
        return agentRepository.findById(userId);
    }
}
