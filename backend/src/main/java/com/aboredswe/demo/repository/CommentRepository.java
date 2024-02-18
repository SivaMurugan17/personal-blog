package com.aboredswe.demo.repository;

import com.aboredswe.demo.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<Comment,String> {
    List<Comment> findAllByPreviousCommentId(String previousCommentId);
}
