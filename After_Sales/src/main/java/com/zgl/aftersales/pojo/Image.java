package com.zgl.aftersales.pojo;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.sql.Blob;

@AllArgsConstructor
@NoArgsConstructor
public class Image implements Serializable {
    private int Image_id;
    private byte[] ImageBlob;

    public int getImage_id() {
        return Image_id;
    }

    public void setImage_id(int image_id) {
        Image_id = image_id;
    }

    public byte[] getImageBlob() {
        return ImageBlob;
    }

    public void setImageBlob(byte[] imageBlob) {
        ImageBlob = imageBlob;
    }

}
