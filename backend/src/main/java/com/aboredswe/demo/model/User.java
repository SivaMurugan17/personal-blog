package com.aboredswe.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class User {
    private String name;
    private String email;
    private String password;
    @Id
    @GeneratedValue
    private long id;
}
