package com.zgl.aftersales.service;

import com.zgl.aftersales.pojo.*;
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
    //int addImage(List<Image> images);
    int addImage(Image image);
    int addImageQuestion(Integer Image_id,Integer Question_id);
    List<Image> checkImages(Integer Question_id);
    //分页
    List<List<?>> showAllQuestions(Map<String,Object> map);
    List<List<?>> fuzzyQuery(Map<String,Object> map);

    List<Integer> selectAll_id();
    List<String> selectWorkerByQuesID(String quesID);

    void updateStatus(String questionID);
    List<Question> showOvertimeAccepte();
    List<Question> shoeOvertimeUnaccepte();


    //int DeleteUser(int User_id);
    Users checkPostMan(int User_id);
    List<Items> checkItemname();
    int checkItemId(Integer item_id);
    List<FAQs> checkFaqs(String faq_String);
}