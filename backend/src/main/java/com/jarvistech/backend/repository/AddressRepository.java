package com.jarvistech.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jarvistech.backend.model.user.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

}
