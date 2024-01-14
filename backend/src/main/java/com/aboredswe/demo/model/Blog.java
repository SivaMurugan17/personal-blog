package com.aboredswe.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Data
@Document
public class Blog {
    private String title;
    private String content;
    private String authorEmail;
    private String authorName;
    @Id
    private String id;
    private Date date;
    private List<String> tags;
}
