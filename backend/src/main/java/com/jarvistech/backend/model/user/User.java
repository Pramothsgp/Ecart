package com.jarvistech.backend.model.user;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;




@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true,name = "username")
    private String username;

    @Column(nullable = false, name = "password")
    private String password;

    @Column(nullable = false, unique = true,name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "image",columnDefinition = "LONGBLOB")
    private byte[] image;

    @Column(name = "role")
    private String role;


    @PrePersist
    void setDefaultRole() {
        if (role == null) {
            role = "USER";
        }
    }
}


