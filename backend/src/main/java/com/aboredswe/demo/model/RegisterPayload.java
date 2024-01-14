package com.aboredswe.demo.model;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class RegisterPayload {
    private String email;
    private String name;
    private String password;
}
