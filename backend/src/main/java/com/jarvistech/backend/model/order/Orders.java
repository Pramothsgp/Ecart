package com.jarvistech.backend.model.order;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.jarvistech.backend.model.Products.Product;
import com.jarvistech.backend.model.deliveryAgent.DeliveryAgent;
import com.jarvistech.backend.model.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "orders")
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties({"password" , "email"})
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties({"orders"}) // Prevents cyclic reference
    private Product product;


    private int quantity;
    private BigDecimal totalPrice;
    private String status;
    
    @ManyToOne
    @JoinColumn(name = "delivery_agent_id", referencedColumnName = "id")
    private DeliveryAgent deliveryAgent;
}
