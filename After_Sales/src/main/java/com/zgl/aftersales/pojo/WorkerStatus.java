package com.zgl.aftersales.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class WorkerStatus {
    //是否点击接收按钮
    private Boolean is_accepted_status=false;
    //是否点击提交按钮
    private Boolean is_finish_status=false;
    //显示提示信息
    private String msg;
}
