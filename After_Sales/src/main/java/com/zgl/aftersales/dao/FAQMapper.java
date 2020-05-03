package com.zgl.aftersales.dao;

import com.zgl.aftersales.pojo.FAQs;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author Alice
 */
@Mapper
@Repository
public interface FAQMapper {
    List<FAQs> selectAllFAQ();

    void addFAQ(FAQs faQs);
}
