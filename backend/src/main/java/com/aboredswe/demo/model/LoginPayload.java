package com.aboredswe.demo.model;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class LoginPayload {
    private String email;
    private String password;
}
