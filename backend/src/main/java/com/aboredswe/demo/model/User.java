package com.aboredswe.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class User {
    private String name;
    private String email;
    private String password;
    @Id
    private String id;
}
