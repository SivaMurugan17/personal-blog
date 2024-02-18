package com.aboredswe.demo.service;

import com.aboredswe.demo.model.Comment;
import com.aboredswe.demo.model.CommentPayload;
import com.aboredswe.demo.repository.CommentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Slf4j
@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public List<Comment> getAllCommentsUnderThisComment(String headCommentId) {
        List<Comment> list = commentRepository.findAllByPreviousCommentId(headCommentId);
        for(Comment comment : list){
            list.addAll(getAllCommentsUnderThisComment(comment.getPreviousCommentId()));
        }
        return list;
    }

    public Comment postComment(CommentPayload commentPayload) {
        Comment comment = Comment.builder()
                .text(commentPayload.getText())
                .authorEmail(commentPayload.getAuthorEmail())
                .date(new Date())
                .previousCommentId(commentPayload.getPreviousCommentId())
                .build();
        return commentRepository.save(comment);
    }

    public String deleteComment(String id) {
        commentRepository.deleteById(id);
        log.info("Comment deleted : {}",id);
        return "Comment deleted.";
    }
}
