package com.jarvistech.backend.dto;

import com.jarvistech.backend.model.deliveryAgent.DeliveryAgentLocation;
import com.jarvistech.backend.model.order.Orders;

import lombok.Data;

import java.util.List;

@Data
public class DeliveryAgentAndOrders {
    private Long id;
    private String vehicleType;
    private String vehicleNumber;
    private String licenseNumber;
    private Long mobileNumber;
    private DeliveryAgentLocation location;
    private List<Orders> orders;
}
