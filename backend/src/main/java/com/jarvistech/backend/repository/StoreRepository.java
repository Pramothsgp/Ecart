package com.jarvistech.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.jarvistech.backend.model.Store.Store;
import com.jarvistech.backend.model.Store.StoreAndProduct;


@Repository
public interface StoreRepository extends JpaRepository<StoreAndProduct, Integer> {

    @Query("SELECT s FROM StoreAndProduct s WHERE s.id = ?1")
    Optional<StoreAndProduct> findStoreById(Integer id);


    @Query("SELECT s FROM Store s WHERE s.id = ?1")
    Optional<Store> findStoreDetailsById(Integer id);
}
