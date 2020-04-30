package com.zgl.aftersales.dao;


import com.zgl.aftersales.pojo.Question;
import com.zgl.aftersales.pojo.Users;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Mapper
@Repository
public interface QuestionMapper {
    int addQuestion(Question question);
    Question checkQuestion(int Question_id);
    List<Question> checkQuestionsubmited(Integer User_id);
    List<Question> checkQuestionfinished(Integer User_id);
    List<Question> checkQuestiondealing(Integer User_id);
    List<Question> showAllQuestions();
    List<Question> fuzzyQuery(String key);

    //int DeleteUser(int User_id);
    Users checkPostMan(int User_id);
    int updateUser(List<Users> list);
    //int updateUser(@Param("upassword") String upassword,@Param("uname") String uname);

//    List<Question> batchSelect(List<String> list);//批量查询
//    int batchInsert(List<Question> list);//批量插入
//    int batchUpdate(List<Question> list);//批量更新
//    int batchDelete(List<String> list);//批量删除

}


