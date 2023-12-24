package com.aboredswe.demo.model;

import lombok.Data;

@Data
public class Blog {
    private String title;
    private String content;
    private String authorEmail;
    private long id;
}
