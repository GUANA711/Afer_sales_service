package com.zgl.aftersales.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Alice
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FAQs {
    private int Faq_id;
    private String Faq_question;
    private String Faq_answer;
}
