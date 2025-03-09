package com.jarvistech.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jarvistech.backend.model.deliveryAgent.DeliveryAgent;

public interface AgentRepository extends JpaRepository<DeliveryAgent, Long> {

}
