package com.aboredswe.demo.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @NotBlank(message = "Text should not be empty")
    private String text;

    @NotNull
    @Email
    private String authorEmail;
    private Date date;
    private String previousCommentId;
}
