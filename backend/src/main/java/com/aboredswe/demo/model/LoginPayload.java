package com.aboredswe.demo.model;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class LoginPayload {

    @NotNull(message = "Email should not be null")
    @Email
    private String email;

    @NotBlank(message = "Password should not be blank")
    private String password;
}
