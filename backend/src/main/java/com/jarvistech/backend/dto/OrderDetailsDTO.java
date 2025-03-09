package com.jarvistech.backend.dto;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailsDTO {
    private Long orderId;
    private String productName;
    private BigDecimal price;
    private int quantity;
    private String status;
}
