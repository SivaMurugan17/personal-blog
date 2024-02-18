package com.aboredswe.demo.model;

import lombok.Data;

@Data
public class LikePayload {
    private String userEmail;
    private String blogId;
}
