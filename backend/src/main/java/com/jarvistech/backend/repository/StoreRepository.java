package com.jarvistech.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jarvistech.backend.model.Store;


@Repository
public interface StoreRepository extends JpaRepository<Store, Integer> {

    @Query("SELECT s FROM Store s WHERE s.id = ?1")
    Optional<Store> findStoreById(Integer id);
}
