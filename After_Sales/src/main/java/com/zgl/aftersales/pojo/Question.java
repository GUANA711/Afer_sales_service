package com.zgl.aftersales.pojo;


import java.io.Serializable;

public class Question implements Serializable {

    private int Question_id;
    private int item_id;
    private enum Question_type1{
        Y,N;
    }
    private Question_type1 Question_type;
    private enum Question_status1{
        accepted,processing,done,overtime;
    }
    private Question_status1 Question_status;
    private String Question_detail;
    private int User_id;

    public Question(int question_id, int item_id, String question_type, String question_status, String question_detail, int user_id) {
        Question_id = question_id;
        this.item_id = item_id;
        Question_type= Question_type1.valueOf(question_type);
        Question_status= Question_status1.valueOf(question_status);
        Question_detail = question_detail;
        User_id = user_id;
    }

    public Question(){

    }

    public int getQuestion_id() {
        return Question_id;
    }

    public void setQuestion_id(int question_id) {
        Question_id = question_id;
    }

    public int getItem_id() {
        return item_id;
    }

    public Question_type1 getQuestion_type() {
        return Question_type;
    }

    public void setQuestion_type(Question_type1 question_type) {
        Question_type = question_type;
    }

    public Question_status1 getQuestion_status() {
        return Question_status;
    }

    public void setQuestion_status(Question_status1 question_status) {
        Question_status = question_status;
    }

    public void setItem_id(int item_id) {
        this.item_id = item_id;
    }

    public String getQuestion_detail() {
        return Question_detail;
    }

    public void setQuestion_detail(String question_detail) {
        Question_detail = question_detail;
    }

    public int getUser_id() {
        return User_id;
    }

    public void setUser_id(int user_id) {
        User_id = user_id;
    }

    @Override
    public String toString() {
        return "Question{" +
                "Question_id=" + Question_id +
                ", item_id=" + item_id +
                ", Question_detail='" + Question_detail + '\'' +
                ", User_id=" + User_id +
                '}';
    }
}
