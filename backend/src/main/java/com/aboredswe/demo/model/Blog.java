package com.aboredswe.demo.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Data
@Builder
@Document
public class Blog {

    @Id
    private String id;

    @NotBlank(message = "Title should not be empty")
    private String title;

    @NotBlank(message = "Content should not be empty")
    private String content;

    @DBRef
    private User author;

    private Date date;

    private List<String> tags;

    private List<String> likedBy;

    @DBRef
    private List<Comment> comments;
}
