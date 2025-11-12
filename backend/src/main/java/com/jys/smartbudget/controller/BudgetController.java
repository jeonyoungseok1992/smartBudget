package com.jys.smartbudget.controller;

import com.jys.smartbudget.config.JwtUtil;
import com.jys.smartbudget.dto.BudgetDTO;
import com.jys.smartbudget.dto.BudgetUsageDTO;
import com.jys.smartbudget.service.BudgetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/budgets")
public class BudgetController {

    private final BudgetService budgetService;

    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    // 예산 등록 (JWT에서 userId 추출)
    @PostMapping
    public String insertBudget(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody BudgetDTO budget) {

        String token = authHeader.replace("Bearer ", "");
        String userId = JwtUtil.extractUserId(token);
        budget.setUserId(userId);

        budgetService.insertBudget(budget);
        return "예산이 등록되었습니다.";
    }

    // 검색 (필요시 userId 포함)
    @GetMapping("/search")
    public List<BudgetDTO> searchBudgets(
            @RequestHeader("Authorization") String authHeader,
            BudgetDTO condition) {

        String token = authHeader.replace("Bearer ", "");
        String userId = JwtUtil.extractUserId(token);
        condition.setUserId(userId);

        return budgetService.selectBudgetsByConditionWithPaging(condition);
    }

    @PutMapping
    public String updateBudget(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody BudgetDTO budget) {

        String token = authHeader.replace("Bearer ", "");
        String userId = JwtUtil.extractUserId(token);
        budget.setUserId(userId);

        budgetService.updateBudget(budget);
        return "예산이 수정되었습니다.";
    }

    @DeleteMapping("/{id}")
    public String deleteBudget(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id) {

        String token = authHeader.replace("Bearer ", "");
        String userId = JwtUtil.extractUserId(token);

        budgetService.deleteBudget(id, userId);
        return "예산이 삭제되었습니다.";
    }

    @GetMapping("/usage")
    public List<BudgetUsageDTO> getBudgetUsage(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        String userId = JwtUtil.extractUserId(token);
        return budgetService.getBudgetUsage(userId);
    }
}
