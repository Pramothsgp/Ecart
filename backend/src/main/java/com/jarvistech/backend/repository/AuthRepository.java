package com.jarvistech.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jarvistech.backend.model.user.User;

@Repository
public interface AuthRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByUsernameOrEmail(String username, String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
