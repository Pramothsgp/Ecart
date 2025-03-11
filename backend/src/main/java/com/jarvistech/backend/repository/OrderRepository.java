package com.jarvistech.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jarvistech.backend.model.order.Orders;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long> {
    List<Orders> findByUserId(Long userId);
    List<Orders> findByIdIn(List<Long> ids);
    List<Orders> findByDeliveryAgentId(Long agentId);
}
