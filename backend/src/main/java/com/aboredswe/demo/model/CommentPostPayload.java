package com.aboredswe.demo.model;

import lombok.Data;

@Data
public class CommentPostPayload {
    private String text;
    private String commentedBy;
}
