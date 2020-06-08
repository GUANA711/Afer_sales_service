package com.zgl.aftersales.service.impl;


import com.zgl.aftersales.dao.QuestionMapper;
import com.zgl.aftersales.pojo.*;
import com.zgl.aftersales.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


@Service
public class QuestionImpl implements QuestionService {
    @Autowired
    QuestionMapper db;
    @Override
    public int addQuestion(Question question) {
        return db.addQuestion(question);
    }

    @Override
    public Question checkQuestion(int Question_id) {
        return db.checkQuestion(Question_id);
    }

    @Override
    public List<Question> checkQuestionsubmited(Integer User_id) {
        return db.checkQuestionsubmited(User_id);
    }

    @Override
    public List<Question> checkQuestionfinished(Integer User_id) {
        return db.checkQuestionfinished(User_id);
    }

    @Override
    public List<Question> checkQuestiondealing(Integer User_id) {
        return db.checkQuestiondealing(User_id);
    }

    @Override
    public int addImage(Image image) {
        return db.addImage(image);
    }

//    @Override
//    public int addImage(List<Image> images) {
//        return db.addImage(images);
//    }

    @Override
    public int addImageQuestion(Integer Image_id,Integer Question_id) {
        return db.addImageQuestion(Image_id,Question_id);
    }
    @Override
    public List<Image> checkImages(Integer Question_id){
        return db.checkImages(Question_id);
    };

    @Override
    public List<List<?>> showAllQuestions(Map<String, Object> map) {
        return db.showAllQuestions(map);
    }

    @Override
    public List<List<?>> fuzzyQuery(Map<String, Object> map) {
        return db.fuzzyQuery(map);
    }

    @Override
    public List<Integer> selectAll_id() {
        return db.selectAll_id();
    }

    @Override
    public List<Question> shoeOvertimeUnaccepte() {
        return db.shoeOvertimeUnaccepte();
    }

    @Override
    public List<Question> showOvertimeAccepte() {
        return db.showOvertimeAccepte();
    }

    @Override
    public void updateStatus(String questionID) {
        db.updateStatus(questionID);
    }

    @Override
    public List<String> selectWorkerByQuesID(String quesID) {
        return db.selectWorkerByQuesID(quesID);
    }


    @Override
    public Users checkPostMan(int User_id) {
        return db.checkPostMan(User_id);
    }

    @Override
    public List<Items> checkItemname(){
        return db.checkItemname();
    }

    @Override
    public int checkItemId(Integer item_id){
        return db.checkItemId(item_id);
    }

    @Override
    public List<FAQs> checkFaqs(String faq_String){
        return db.checkFaqs(faq_String);
    }




}