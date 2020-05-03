package com.zgl.aftersales.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * @author Alice
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class WorkerStatus {
    private Boolean status=false;
    private String msg;
}
