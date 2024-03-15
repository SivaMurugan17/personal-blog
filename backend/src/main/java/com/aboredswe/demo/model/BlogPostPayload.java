package com.aboredswe.demo.model;

import lombok.Data;

import java.util.List;

@Data
public class BlogPostPayload {
    private String title;
    private String content;
    private String authorEmail;
    private List<String> tags;
}
