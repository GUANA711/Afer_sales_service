package com.zgl.aftersales.pojo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author Alice
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Log {
    private int Log_id;
    private int User_id;
    private String User_name;
    private String Operation;
    private String Method;
//    private String Params;
    private String IP;
    private String Creat_time;
}
