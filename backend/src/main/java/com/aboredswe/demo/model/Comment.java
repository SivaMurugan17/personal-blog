package com.aboredswe.demo.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Builder
@Document
public class Comment {

    @Id
    private String id;

    @NotBlank(message = "Text should not be empty")
    private String text;

    @NotNull
    @DBRef
    private User commentedBy;

    private Date date;
}
