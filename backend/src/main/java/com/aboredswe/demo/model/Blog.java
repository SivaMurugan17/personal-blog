package com.aboredswe.demo.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Blog {
    private String title;

    @Column(columnDefinition = "text")
    private String content;
    private String authorEmail;
    @Id
    @GeneratedValue
    private long id;
    private Date date;
}
