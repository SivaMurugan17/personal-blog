package com.aboredswe.demo.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentPayload {

    @NotBlank(message = "Text should not be blank")
    private String text;

    @NotNull(message = "Email should not be null")
    @Email
    private String authorEmail;
    private String previousCommentId;
}
