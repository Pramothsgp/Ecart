package com.jarvistech.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jarvistech.backend.model.deliveryAgent.DeliveryAgentLocation;

@Repository
public interface LocationRepository extends JpaRepository<DeliveryAgentLocation, Long> {

}
