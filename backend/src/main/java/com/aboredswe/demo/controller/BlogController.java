package com.aboredswe.demo.controller;

import com.aboredswe.demo.model.Blog;
import com.aboredswe.demo.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blog")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @PostMapping
    public ResponseEntity<Boolean> addBlog(@RequestBody Blog blog){
        return blogService.addBlog(blog);
    }

    @GetMapping
    public ResponseEntity<Blog[]> findAllBlogs(){
        return blogService.findAllBlogs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> findBlogById(@PathVariable long id){
        return blogService.findById(id);
    }
}
