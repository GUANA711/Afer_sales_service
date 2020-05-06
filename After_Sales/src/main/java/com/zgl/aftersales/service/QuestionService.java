package com.zgl.aftersales.service;

import com.zgl.aftersales.pojo.Question;
import com.zgl.aftersales.pojo.Users;
import org.springframework.stereotype.Service;


import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service
@Resource
public interface QuestionService {
    int addQuestion(Question question);
    Question checkQuestion(int Question_id);
    List<Question> checkQuestionsubmited(Integer User_id);
    List<Question> checkQuestionfinished(Integer User_id);
    List<Question> checkQuestiondealing(Integer User_id);
    List<Question> showAllQuestions();
    List<Question> fuzzyQuery(String key);
    List<Integer> selectAll_id();
    List<String> selectWorkerByQuesID(String quesID);
    void updateStatus(String questionID);
    List<Question> showOvertimeAccepte();
    List<Question> shoeOvertimeUnaccepte();


    //int DeleteUser(int User_id);
    Users checkPostMan(int User_id);
    int updateUser(List<Users> list);
}