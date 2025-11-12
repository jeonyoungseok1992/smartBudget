package com.jys.smartbudget.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.time.LocalDate;

@Data
public class TransactionDTO {
    private Long id;
    private String userId;
    private String category;
    private String type; // income / expense
    private Double amount;
    private LocalDate date;
    private String description;
    private LocalDateTime createdAt;
}
