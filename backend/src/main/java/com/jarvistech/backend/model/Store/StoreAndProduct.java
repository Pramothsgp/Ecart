package com.jarvistech.backend.model.Store;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.jarvistech.backend.model.Products.Product;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "owners")
public class StoreAndProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false,name = "storeName",length = 255)
    private String storeName;

    @Column(nullable = false, name = "address")
    private String address;

    @Column(nullable = false ,name = "user_id")
    private Integer userId;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Product> products;

}
