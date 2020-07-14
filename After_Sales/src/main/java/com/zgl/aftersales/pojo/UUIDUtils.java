package com.zgl.aftersales.pojo;

import lombok.AllArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
// 随机生成激活码
public class UUIDUtils {
    public String getUUID(){
        return UUID.randomUUID().toString().replace("-","");
    }
}
