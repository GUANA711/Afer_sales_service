package com.zgl.aftersales.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Log {
    private int Log_id;
    private enum Table_name{
        items,maintenance,questions,role,role_limit,users,user_role,faq
    }
    private enum  Log_type{
        insert,delete,update,system,other
    }
    private Table_name Table_name;
    private int id;
    private String Colum;
    private String Old_value;
    private String New_value;
    private int User_id;
    private String User_name;
    private String Creat_time;
    private String Remark;
    private Log_type Log_type;


}
