package com.jarvistech.backend.model.user;

import java.util.List;
import com.jarvistech.backend.dto.OrderDetailsDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserWithOrders {
    private Long userId;
    private List<OrderDetailsDTO> orders;
}
