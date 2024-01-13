package com.aboredswe.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;

@Data
@Document
public class Blog {
    private String title;
    private String content;
    private String authorEmail;
    @Id
    private String id;
    private Date date;
}
