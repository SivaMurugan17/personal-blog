package com.aboredswe.demo.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Data
@Builder
@Document
public class Blog {

    @NotBlank(message = "Title should not be empty")
    private String title;

    @NotBlank(message = "Content should not be empty")
    private String content;

    @NotNull
    @Email
    private String authorEmail;

    private String authorName;

    @Id
    private String id;

    private Date date;

    private List<String> tags;

    private List<String> likedBy;

    private String nextCommentId;
}
