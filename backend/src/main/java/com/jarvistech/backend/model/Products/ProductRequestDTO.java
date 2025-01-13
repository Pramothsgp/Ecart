package com.jarvistech.backend.model.Products;



import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ProductRequestDTO {
    private String productName;
    private Double price;
    private String category;
    private String description;
    private MultipartFile image;
    private Integer stock;
}
