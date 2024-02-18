package com.aboredswe.demo.controller;

import com.aboredswe.demo.model.Comment;
import com.aboredswe.demo.model.CommentPayload;
import com.aboredswe.demo.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping
    public ResponseEntity<List<Comment>> getAllCommentsForABlog(@RequestParam String headCommentId){
        List<Comment> comments = commentService.getAllCommentsUnderThisComment(headCommentId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Comment> postComment(@Valid @RequestBody CommentPayload commentPayload){
        Comment savedComment = commentService.postComment(commentPayload);
        return new ResponseEntity<>(savedComment,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable String id){
        String status = commentService.deleteComment(id);
        return new ResponseEntity<>(status,HttpStatus.OK);
    }
}
