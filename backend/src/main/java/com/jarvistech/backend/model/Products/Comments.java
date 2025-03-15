package com.jarvistech.backend.model.Products;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.jarvistech.backend.model.user.User;

import jakarta.persistence.Column;
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
@Table(name = "comments")
public class Comments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", updatable = false)
    @JsonProperty("user")
    private User user;
    
    @Column(name = "rating", nullable = false)
    private Integer rating;
    @Column(name = "comment" ,nullable = false)
    private String comment;

    @ManyToOne
    @JoinColumn(name = "product_id", updatable = false)
    @JsonProperty("productId")
    @JsonBackReference
    private Product product;
}
