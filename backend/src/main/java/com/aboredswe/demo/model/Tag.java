package com.aboredswe.demo.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Data
@Builder
@Document
public class Tag {
    @Id
    private String name;
    private Set<String> blogs;
}
