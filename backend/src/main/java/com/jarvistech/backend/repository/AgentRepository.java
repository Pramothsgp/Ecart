package com.jarvistech.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jarvistech.backend.model.deliveryAgent.DeliveryAgent;

public interface AgentRepository extends JpaRepository<DeliveryAgent, Long> {
    Optional<DeliveryAgent> findByUserUsername(String username);
}
