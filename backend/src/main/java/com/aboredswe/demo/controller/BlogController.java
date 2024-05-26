package com.aboredswe.demo.controller;

import com.aboredswe.demo.error.AuthException;
import com.aboredswe.demo.error.BlogNotFoundException;
import com.aboredswe.demo.error.TagNotFoundException;
import com.aboredswe.demo.error.UserNotFoundException;
import com.aboredswe.demo.model.Blog;
import com.aboredswe.demo.model.BlogPostPayload;
import com.aboredswe.demo.service.BlogService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/blog")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @PostMapping
    public ResponseEntity<Blog> addBlog(@Valid @RequestBody BlogPostPayload blog) throws AuthException {
        try {
            Blog savedBlog = blogService.addBlog(blog);
            log.info("Request: POST /blog, Blog added: {}",savedBlog);
            return new ResponseEntity<>(savedBlog,HttpStatus.CREATED);
        } catch (UserNotFoundException e) {
            throw new AuthException("Invalid author");
        }
    }

    @GetMapping
    public ResponseEntity<List<Blog>> findAllBlogs(){
        List<Blog> foundBlogs = blogService.findAllBlogs();
        log.info("Request: GET /blog, Found blogs: {}",foundBlogs.size());
        return new ResponseEntity<>(foundBlogs,HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> findBlogById(@PathVariable String id){
        try {
            Blog foundBlog = blogService.findById(id);
            log.info("Request: GET /blog/id, Found blog: {}",foundBlog);
            return new ResponseEntity<>(foundBlog,HttpStatus.OK);
        } catch (BlogNotFoundException e) {
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/author")
    public ResponseEntity<List<Blog>> findBlogsByEmail(@RequestParam String email){
        List<Blog> blogsByUser = blogService.findBlogsByEmail(email);
        log.info("Request: GET /blog/author?email, Found blogs for user: {}",blogsByUser.size());
        return new ResponseEntity<>(blogsByUser,HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Blog> editBlog(@Valid @RequestBody Blog blog){
        Blog editedBlog = blogService.editBlog(blog);
        log.info("Request: PUT /blog, Edited blog: {}",editedBlog);
        return new ResponseEntity<>(editedBlog,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable String id) throws AuthException {
        try {
            blogService.deleteBlog(id);
            log.info("Request: DELETE /blog/id, Deleted blog id: {}",id);
            return new ResponseEntity<>("Blog deleted",HttpStatus.OK);
        } catch (BlogNotFoundException e) {
            throw new AuthException("Blog not found");
        } catch (TagNotFoundException e) {
            throw new AuthException("Tag not found");
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Blog>> search(@RequestParam String title){
        List<Blog> result = blogService.search(title);
        log.info("Request: GET /blog/search, Found blogs: {}",result.size());
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @PostMapping("/like")
    public ResponseEntity<List<String>> addLike(@RequestParam String userEmail,
                                                @RequestParam String blogId ) throws AuthException {
        try {
            List<String> likedBy = blogService.addLike(userEmail,blogId);
            log.info("Request: POST /blog/like, Like added to blog: {}",blogId);
            return ResponseEntity.ok().body(likedBy);
        } catch (BlogNotFoundException e) {
            throw new AuthException("Blog not found");
        }
    }

    @DeleteMapping("/like")
    public ResponseEntity<List<String>> removeLike(@RequestParam String userEmail,
                                                   @RequestParam String blogId ) throws AuthException {
        try {
            List<String> likedBy = blogService.removeLike(userEmail, blogId);
            log.info("Request: DELETE /blog/like, Like removed from blog: {}",blogId);
            return ResponseEntity.ok().body(likedBy);
        } catch (BlogNotFoundException e) {
            throw new AuthException("Blog not found");
        }
    }
}
