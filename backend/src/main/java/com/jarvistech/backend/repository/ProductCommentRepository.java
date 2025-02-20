package com.jarvistech.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jarvistech.backend.model.Products.ProductComments;

@Repository
public interface ProductCommentRepository extends JpaRepository<ProductComments, Long> {

}
