package com.jys.smartbudget.controller;

import com.jys.smartbudget.config.JwtUtil;
import com.jys.smartbudget.dto.ExpenseDTO;
import com.jys.smartbudget.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // 지출 등록
    @PostMapping
    public String insertExpense(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ExpenseDTO expense) {

        String token = authHeader.replace("Bearer ", "");
        String userId = JwtUtil.extractUserId(token);
        expense.setUserId(userId);

        expenseService.insertExpense(expense);
        return "지출이 등록되었습니다.";
    }

    // 지출 수정
    @PutMapping
    public String updateExpense(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ExpenseDTO expense) {

        String token = authHeader.replace("Bearer ", "");
        String userId = JwtUtil.extractUserId(token);
        expense.setUserId(userId);

        expenseService.updateExpense(expense);
        return "지출이 수정되었습니다.";
    }

    // 지출 삭제 (PK + userId 체크)
    @DeleteMapping("/{id}")
    public String deleteExpense(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id) {

        String token = authHeader.replace("Bearer ", "");
        String userId = JwtUtil.extractUserId(token);

        expenseService.deleteExpense(id, userId);
        return "지출이 삭제되었습니다.";
    }

}
