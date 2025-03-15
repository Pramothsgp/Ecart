package com.jarvistech.backend.dto;

import lombok.Data;

@Data
public class CommentRequestDTO {
    private Long userId;
    private Long productId;
    private Integer rating;
    private String comment;
}

