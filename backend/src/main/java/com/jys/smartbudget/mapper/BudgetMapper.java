package com.jys.smartbudget.mapper;

import com.jys.smartbudget.dto.BudgetDTO;
import com.jys.smartbudget.dto.BudgetUsageDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BudgetMapper {
    void insertBudget(BudgetDTO budget);
    List<BudgetDTO> selectBudgetsByConditionWithPaging(BudgetDTO condition);
    void updateBudget(BudgetDTO budget);
    void deleteBudget(Long id, String userId);
    List<BudgetUsageDTO> getBudgetUsage(String userId);
}
