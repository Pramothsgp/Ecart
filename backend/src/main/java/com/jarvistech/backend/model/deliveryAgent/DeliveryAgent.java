package com.jarvistech.backend.model.deliveryAgent;

import com.jarvistech.backend.model.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "delivery_agent")
public class DeliveryAgent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    private String vehicleType;
    private String vehicleNumber;
    private String licenseNumber;
    private Long mobileNumber;

    @OneToOne
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    private DeliveryAgentLocation location;
}
