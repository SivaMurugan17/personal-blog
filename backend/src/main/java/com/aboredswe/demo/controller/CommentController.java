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

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    @PostMapping("/{blogId}")
    public ResponseEntity<List<Comment>> addComment(@RequestBody CommentPostPayload commentPostPayload,
                                                    @PathVariable String blogId)
                                                        throws AuthException {
        try {
            List<Comment> currentComments = commentService.addComment(commentPostPayload, blogId);
            log.info("Request: POST /comment/blogId, Comment added");
            return ResponseEntity.ok().body(currentComments);
        } catch (BlogNotFoundException e) {
            throw new AuthException("Blog not found");
        } catch (UserNotFoundException e) {
            throw new AuthException("User not found");
        }

    }

    @DeleteMapping
    public ResponseEntity<List<Comment>> deleteComment(@RequestParam String blogId,
                                                       @RequestParam String commentId)
                                                        throws AuthException {
        try {
            List<Comment> currentComments = commentService.deleteComment(blogId, commentId);
            log.info("Request: DELETE /comment?blogId, Deleted comment: {}",blogId);
            return ResponseEntity.ok().body(currentComments);
        } catch (BlogNotFoundException e) {
            throw new AuthException("Blog not found");
        }
    }
}
