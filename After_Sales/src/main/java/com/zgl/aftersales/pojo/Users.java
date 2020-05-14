package com.zgl.aftersales.pojo;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users implements Serializable {
    private int User_id;
    private String User_name;
    private String Password;
    private String Tel;
    private String Email;
    private int Task_num;

}
