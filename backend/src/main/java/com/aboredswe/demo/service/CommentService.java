package com.aboredswe.demo.service;

import com.aboredswe.demo.error.BlogNotFoundException;
import com.aboredswe.demo.error.UserNotFoundException;
import com.aboredswe.demo.model.Blog;
import com.aboredswe.demo.model.Comment;
import com.aboredswe.demo.model.CommentPostPayload;
import com.aboredswe.demo.model.User;
import com.aboredswe.demo.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CommentService {
    @Autowired
    BlogService blogService;

    @Autowired
    AuthService authService;

    @Autowired
    CommentRepository commentRepository;

    public List<Comment> addComment(CommentPostPayload commentPostPayload, String blogId) throws BlogNotFoundException, UserNotFoundException {
        Comment savedComment = commentRepository.save(buildComment(commentPostPayload));
        return addCommentToBlog(savedComment,blogId);
    }

    private Comment buildComment(CommentPostPayload commentPostPayload) throws UserNotFoundException {
        User foundUser = authService.findByEmail(commentPostPayload.getCommentedBy());
        return Comment.builder()
                .text(commentPostPayload.getText())
                .commentedBy(foundUser)
                .date(new Date())
                .build();
    }

    private List<Comment> addCommentToBlog(Comment comment, String blogId) throws BlogNotFoundException {
        Blog foundBlog = blogService.findById(blogId);
        foundBlog.getComments().add(comment);
        blogService.editBlog(foundBlog);
        return foundBlog.getComments();
    }

    public List<Comment> deleteComment(String blogId, String commentId) throws BlogNotFoundException {
        List<Comment> currentComments = removeCommentFromBlog(blogId,commentId);
        commentRepository.deleteById(commentId);
        return currentComments;
    }

    private List<Comment> removeCommentFromBlog(String blogId, String commentId) throws BlogNotFoundException {
        Blog foundBlog = blogService.findById(blogId);
        foundBlog.setComments(foundBlog
                .getComments()
                .stream()
                .filter(comment -> !comment.getId().equals(commentId))
                .toList());
        blogService.editBlog(foundBlog);
        return foundBlog.getComments();
    }
}
