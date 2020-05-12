package com.zgl.aftersales.pojo;


import java.io.Serializable;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.Calendar;


 enum Question_status1{
    unaccepted,accepted,done,overtime;
};
public class Question implements Serializable {

    SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
    Calendar calendar = Calendar.getInstance();

    private int Question_id;
    private int item_id;
    private String Question_type;
    private Question_status1 Question_status;
    private String Question_detail;
    private int User_id;
    private String Commit_time;

    public Question(int question_id,int item_id, String question_type, String question_status, String question_detail, int user_id,String commit_time) {
        Question_id=question_id;
        this.item_id = item_id;
        Question_type= question_type;
        Question_status= Question_status1.valueOf(question_status);
        Question_detail = question_detail;
        User_id = user_id;
        Commit_time = commit_time;
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

    public String getQuestion_type() {
        return Question_type;
    }

    public void setQuestion_type(String question_type) {
        Question_type = question_type;
    }

    public Question_status1 getQuestion_status() {
        return Question_status;
    }

    public void setQuestion_status(String question_status) {
        Question_status = Question_status1.valueOf(question_status);
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

    public String getCommit_time() {
        return Commit_time;
    }

    public void setCommit_time(String commit_time) {
        Commit_time = commit_time;
    }

    @Override
    public String toString() {
        return "Question{" +
                "Question_id=" + Question_id +
                ", item_id=" + item_id +
                ", Question_type='" + Question_type + '\'' +
                ", Question_status=" + Question_status +
                ", Question_detail='" + Question_detail + '\'' +
                ", User_id=" + User_id +
                ", Commit_time=" + Commit_time +
                '}';
    }
}