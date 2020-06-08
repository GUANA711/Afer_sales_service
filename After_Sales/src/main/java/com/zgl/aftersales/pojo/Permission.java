package com.zgl.aftersales.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Permission {

    private  int permission_id;
    private  String name;
    private String description;
    private String url;
    private  String perms;
    private String parent_id;
    private String type;
}
