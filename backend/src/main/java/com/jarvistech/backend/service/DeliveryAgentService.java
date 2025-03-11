package com.jarvistech.backend.service;

import com.jarvistech.backend.dto.DeliveryAgentAndOrders;
import com.jarvistech.backend.model.deliveryAgent.DeliveryAgent;
import com.jarvistech.backend.model.order.Orders;
import com.jarvistech.backend.repository.AgentRepository;
import com.jarvistech.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryAgentService {

    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private OrderRepository orderRepository;

    public DeliveryAgentAndOrders getDeliveryAgentDetails(Long agentId) {
        DeliveryAgent agent = agentRepository.findById(agentId)
                .orElseThrow(() -> new RuntimeException("Delivery agent not found"));

        List<Orders> orders = orderRepository.findByDeliveryAgentId(agentId);

        DeliveryAgentAndOrders dto = new DeliveryAgentAndOrders();
        dto.setId(agent.getId());
        dto.setVehicleType(agent.getVehicleType());
        dto.setVehicleNumber(agent.getVehicleNumber());
        dto.setLicenseNumber(agent.getLicenseNumber());
        dto.setMobileNumber(agent.getMobileNumber());
        dto.setLocation(agent.getLocation());
        dto.setOrders(orders);

        return dto;
    }
}
