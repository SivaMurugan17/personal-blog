package com.aboredswe.demo.controller;

import com.aboredswe.demo.error.BlogNotFoundException;
import com.aboredswe.demo.model.Blog;
import com.aboredswe.demo.model.LikePayload;
import com.aboredswe.demo.service.BlogService;
import jakarta.validation.Valid;
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
    public ResponseEntity<Blog> addBlog(@Valid @RequestBody Blog blog){
        Blog savedBlog = blogService.addBlog(blog);
        return new ResponseEntity<>(savedBlog,HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Blog>> findAllBlogs(){
        return new ResponseEntity<>(blogService.findAllBlogs(),HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> findBlogById(@PathVariable String id){
        try {
            Blog foundBlog = blogService.findById(id);
            return new ResponseEntity<>(foundBlog,HttpStatus.OK);
        } catch (BlogNotFoundException e) {
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/author")
    public ResponseEntity<List<Blog>> findBlogsByEmail(@RequestParam String email){
        return new ResponseEntity<>(blogService.findBlogsByEmail(email),HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Blog> editBlog(@Valid @RequestBody Blog blog){
        Blog editedBlog = blogService.editBlog(blog);
        return new ResponseEntity<>(editedBlog,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable String id){
        blogService.deleteBlog(id);
        return new ResponseEntity<>("Blog deleted",HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Blog>> search(@RequestParam String title){
        List<Blog> result = blogService.search(title);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @PostMapping("/like")
    public ResponseEntity<Blog> addLike(@RequestBody LikePayload likePayload){
        Blog savedBlog = blogService.addLike(likePayload.getUserEmail(),likePayload.getBlogId());
        return new ResponseEntity<>(savedBlog,HttpStatus.OK);
    }

    @DeleteMapping("/like")
    public ResponseEntity<Blog> removeLike(@RequestBody LikePayload likePayload){
        Blog savedBlog = blogService.removeLike(likePayload.getUserEmail(),likePayload.getBlogId());
        return new ResponseEntity<>(savedBlog,HttpStatus.OK);
    }
}
