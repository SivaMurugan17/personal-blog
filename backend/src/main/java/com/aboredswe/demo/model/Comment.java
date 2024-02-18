package com.aboredswe.demo.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Builder
@Document
public class Comment {
    //follows a linked-list structure with prev value instead of next
    //head will be stored in the blog as an empty comment
    @Id
    private String id;
    private String text;
    private String authorEmail;
    private Date date;
    private String previousCommentId;
}
