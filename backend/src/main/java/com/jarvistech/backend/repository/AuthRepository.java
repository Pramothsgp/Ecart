package com.jarvistech.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jarvistech.backend.model.User;

public interface AuthRepository extends JpaRepository<User, Long> {
    
    Optional<User> findUserByUsernameOrEmail(String username, String email);
}
