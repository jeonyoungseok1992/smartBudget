package com.jys.smartbudget.service;

import com.jys.smartbudget.dto.TransactionDTO;
import com.jys.smartbudget.mapper.TransactionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionMapper transactionMapper;

    public void insertTransaction(TransactionDTO transaction) {
        transactionMapper.insertTransaction(transaction);
    }

    public List<TransactionDTO> selectAllTransactions() {
        return transactionMapper.selectAllTransactions();
    }

    public List<TransactionDTO> selectTransactionsByUser(String userId) {
        return transactionMapper.selectTransactionsByUser(userId);
    }

    public void updateTransaction(TransactionDTO transaction) {
        transactionMapper.updateTransaction(transaction);
    }

    public void deleteTransaction(Long id) {
        transactionMapper.deleteTransaction(id);
    }
}
