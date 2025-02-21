package com.jarvistech.backend.model.cart;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.jarvistech.backend.model.User;
import com.jarvistech.backend.model.Products.Product;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "cart")
@AllArgsConstructor
@NoArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many-to-One relationship with User
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties({"password" , "email"}) // Prevents recursion in JSON response and circular dependency and ignores the specefic values
    private User user;

    // Many-to-One relationship with Product
    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id" , nullable = false)
    @JsonManagedReference // Allows serialization of Product  @JsonBackreference also prevents infinite
                          //
                          // recursion but also hides the values in the response
    private Product product;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;
}
