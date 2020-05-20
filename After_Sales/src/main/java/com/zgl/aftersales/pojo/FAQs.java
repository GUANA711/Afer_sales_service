package com.zgl.aftersales.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author Alice
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FAQs implements Serializable {
    private int Faq_id;
    private String Faq_question;
    private String Faq_answer;
}
