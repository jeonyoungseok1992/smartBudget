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

    // 예산별 지출 조회 (PieChart 용)
    @GetMapping("/budget/{budgetId}")
    public List<ExpenseDTO> getExpensesByBudget(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long budgetId) {

        String token = authHeader.replace("Bearer ", "");
        String userId = JwtUtil.extractUserId(token);

        return expenseService.getExpensesByBudgetId(budgetId, userId);
    }

    // 전체 사용자 지출 조회 (PieChart 전체)
    @GetMapping("/all")
    public List<ExpenseDTO> getAllExpenses(
            @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.replace("Bearer ", "");
        String userId = JwtUtil.extractUserId(token);

        return expenseService.getAllExpensesByUser(userId);
    }
}
