package com.jys.smartbudget.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseDTO {

    private Long id;          // PK
    private Long budgetId;    // FK -> budget.id

    private Integer amount;   // 지출 금액
    private String description;      // 메모
    private String date;      // 날짜 (yyyy-MM-dd)

    private String userId;    // 유저
}
