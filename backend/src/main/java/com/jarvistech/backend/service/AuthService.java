package com.jarvistech.backend.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.jarvistech.backend.model.User;
import com.jarvistech.backend.repository.AuthRepository;


@Service
public class AuthService {

    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
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
}
