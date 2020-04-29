package com.zgl.aftersales.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class Status {
    private Boolean status=false;
    private Object data=null;
    private String msg;
    private int code=0;

}
