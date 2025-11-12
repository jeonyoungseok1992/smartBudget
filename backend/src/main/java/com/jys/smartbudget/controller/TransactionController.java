package com.jys.smartbudget.controller;

import com.jys.smartbudget.dto.TransactionDTO;
import com.jys.smartbudget.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    public String insertTransaction(@RequestBody TransactionDTO transaction) {
        transactionService.insertTransaction(transaction);
        return "거래 내역이 등록되었습니다.";
    }

    @GetMapping
    public List<TransactionDTO> selectAllTransactions() {
        return transactionService.selectAllTransactions();
    }

    @GetMapping("/{userId}")
    public List<TransactionDTO> selectTransactionsByUser(@PathVariable String userId) {
        return transactionService.selectTransactionsByUser(userId);
    }

    @PutMapping("/{id}")
    public String updateTransaction(@RequestBody TransactionDTO transaction) {
        transactionService.updateTransaction(transaction);
        return "거래 내역이 수정되었습니다.";
    }

    @DeleteMapping("/{id}")
    public String deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
        return "거래 내역이 삭제되었습니다.";
    }
}
