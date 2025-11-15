package com.jys.smartbudget.mapper;

import com.jys.smartbudget.dto.ExpenseDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ExpenseMapper {

    void insertExpense(ExpenseDTO expense);

    void updateExpense(ExpenseDTO expense);

    void deleteExpenseByIdAndUserId(Long id, String userId);

    List<ExpenseDTO> selectByBudgetIdAndUserId(Long budgetId, String userId);

    List<ExpenseDTO> selectAllByUserId(String userId);
}
