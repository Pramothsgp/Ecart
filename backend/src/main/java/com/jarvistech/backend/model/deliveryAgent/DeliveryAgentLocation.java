package com.jarvistech.backend.model.deliveryAgent;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import lombok.Data;

@Data
@Entity
@Table(name = "delivery_agent_location")
public class DeliveryAgentLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double latitude;
    private double longitude;
    private long timestamp;
    @Version
    private Long version;
}
