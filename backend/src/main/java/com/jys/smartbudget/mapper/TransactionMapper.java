package com.jys.smartbudget.mapper;

import com.jys.smartbudget.dto.TransactionDTO;
import org.apache.ibatis.annotations.*;
import java.util.List;
import java.util.Map;

@Mapper
public interface TransactionMapper {

    @Insert("INSERT INTO transaction (user_id, category, type, amount, date, description) " +
            "VALUES (#{userId}, #{category}, #{type}, #{amount}, #{date}, #{description})")
    void insertTransaction(TransactionDTO transaction);

    @Select("SELECT * FROM transaction ORDER BY date DESC")
    List<TransactionDTO> selectAllTransactions();

    @Select("SELECT * FROM transaction WHERE user_id = #{userId} ORDER BY date DESC")
    List<TransactionDTO> selectTransactionsByUser(String userId);

    @Update("UPDATE transaction SET category=#{category}, type=#{type}, amount=#{amount}, " +
            "date=#{date}, description=#{description} WHERE id=#{id}")
    void updateTransaction(TransactionDTO transaction);

    @Delete("DELETE FROM transaction WHERE id=#{id}")
    void deleteTransaction(Long id);

    @Select("SELECT category, SUM(amount) AS totalSpent " +
            "FROM transaction " +
            "WHERE user_id = #{userId} AND type = 'expense' " +
            "GROUP BY category")
    List<Map<String, Object>> getCategorySpendingSummary(String userId);

}
