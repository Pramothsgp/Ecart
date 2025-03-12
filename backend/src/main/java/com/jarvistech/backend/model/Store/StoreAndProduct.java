package com.jarvistech.backend.model.Store;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.jarvistech.backend.model.Products.Product;
import com.jarvistech.backend.model.user.Address;
import com.jarvistech.backend.model.user.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    @Column(name = "GSTIN", length = 255)
    @JsonProperty("gstin")
    private String GSTIN;

    @ManyToOne
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Product> products;

}
