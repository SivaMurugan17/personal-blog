package com.aboredswe.demo.controller;

import com.aboredswe.demo.model.Blog;
import com.aboredswe.demo.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @PostMapping
    public ResponseEntity<Blog> addBlog(@RequestBody Blog blog){
        Blog savedBlog = blogService.addBlog(blog);
        if(savedBlog == null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        else{
            return new ResponseEntity<>(savedBlog,HttpStatus.CREATED);
        }
    }

    @GetMapping
    public ResponseEntity<List<Blog>> findAllBlogs(){
        return new ResponseEntity<>(blogService.findAllBlogs(),HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> findBlogById(@PathVariable String id){
        Blog foundBlog = blogService.findById(id);
        if(foundBlog == null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(foundBlog,HttpStatus.OK);
        }
    }

    @GetMapping("/author")
    public ResponseEntity<List<Blog>> findBlogsByEmail(@RequestParam String email){
        return new ResponseEntity<>(blogService.findBlogsByEmail(email),HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Blog> editBlog(@RequestBody Blog blog){
        Blog editedBlog = blogService.editBlog(blog);
        if(editedBlog == null){
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
        else{
            return new ResponseEntity<>(editedBlog,HttpStatus.OK);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable String id){
        blogService.deleteBlog(id);
        return new ResponseEntity<>("Blog deleted",HttpStatus.OK);
    }
}
