package com.zgl.aftersales.dao;

import com.zgl.aftersales.pojo.FAQs;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * @author Alice
 */
@Mapper
@Repository
public interface FAQMapper {
    List<FAQs> selectAllFAQ();
    List<List<?>> showFAQ(Map<String,Object> map);
    void addFAQ(FAQs faQs);
}
