package com.aboredswe.demo.controller;

import com.aboredswe.demo.error.AuthException;
import com.aboredswe.demo.error.BlogNotFoundException;
import com.aboredswe.demo.error.UserNotFoundException;
import com.aboredswe.demo.model.Comment;
import com.aboredswe.demo.model.CommentPostPayload;
import com.aboredswe.demo.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping("/{blogId}")
    public ResponseEntity<Comment> addComment(@RequestBody CommentPostPayload commentPostPayload,
                                              @PathVariable String blogId) throws AuthException {
        try {
            Comment savedComment = commentService.addComment(commentPostPayload, blogId);
            log.info("Request: POST /comment/blogId, Comment added: {}",savedComment);
            return ResponseEntity
                    .ok()
                    .body(savedComment);
        } catch (BlogNotFoundException e) {
            throw new AuthException("Blog not found");
        } catch (UserNotFoundException e) {
            throw new AuthException("User not found");
        }

    }

    @DeleteMapping
    public ResponseEntity<String> deleteComment(@RequestParam String blogId, @RequestParam String commentId) throws AuthException {
        try {
            commentService.deleteComment(blogId, commentId);
            log.info("Request: DELETE /comment?blogId, Deleted comment: {}",blogId);
            return ResponseEntity
                    .ok()
                    .body("Comment deleted");
        } catch (BlogNotFoundException e) {
            throw new AuthException("Blog not found");
        }
    }
}
