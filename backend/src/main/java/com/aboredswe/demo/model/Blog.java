package com.aboredswe.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Blog {
    private String title;
    private String content;
    private String authorEmail;
    @Id
    @GeneratedValue
    private long id;
    private Date date;
}
