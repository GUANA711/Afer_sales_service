package com.zgl.aftersales.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Items implements Serializable {
    private  int Item_id;
    private String Item_name;
    private  String User_id;
}
