package com.zgl.aftersales.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FAQStatus {
    private Boolean faqstatus=false;
    private String faqmsg;
}
