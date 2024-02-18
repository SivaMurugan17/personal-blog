package com.aboredswe.demo.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentPayload {
    private String text;
    private String authorEmail;
    private String previousCommentId;
}
