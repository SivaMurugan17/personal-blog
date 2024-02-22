package com.aboredswe.demo.service;


import com.aboredswe.demo.model.Blog;
import com.aboredswe.demo.model.Comment;
import com.aboredswe.demo.model.CommentPayload;
import com.aboredswe.demo.repository.BlogRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class BlogService {

    @Autowired
    private CommentService commentService;

    @Autowired
    private TagService tagService;

    @Autowired
    private BlogRepository blogRepository;

    public Blog addBlog(Blog blog){
        // add a head comment
        CommentPayload dummyPayload = CommentPayload.builder()
                .text("")
                .authorEmail("")
                .previousCommentId("")
                .build();
        Comment headComment = commentService.postComment(dummyPayload);
        blog.setNextCommentId(headComment.getId());

        //set initial likes
        blog.setLikedBy(new ArrayList<>());
        Blog savedBlog = blogRepository.save(blog);

        // add tags, if present
        for(String tagName : blog.getTags()) {
            tagService.addTag(tagName.toLowerCase(), savedBlog.getId());
        }

        log.info("Blog added, id : {}",savedBlog.getId());
        return savedBlog;
    }

    public List<Blog> findAllBlogs(){
        return blogRepository.findAll();
    }

    public Blog findById(String id){
        return blogRepository.findById(id).orElse(null);
    }

    public List<Blog> findBlogsByEmail(String email){
        return blogRepository.findAll().stream().filter(blog -> blog.getAuthor().getEmail().equals(email)).toList();
    }

    public Blog editBlog(Blog blog) {
        return blogRepository.save(blog);
    }

    public void deleteBlog(String id) {
        Blog foundBlog = blogRepository.findById(id).orElse(null);
        if(foundBlog == null)return;

        //delete comment head
        commentService.deleteComment(foundBlog.getNextCommentId());

        //delete from tags
        for(String tagName : foundBlog.getTags()){
            tagService.deleteBlogIdFromTag(foundBlog.getId(), tagName);
        }
        blogRepository.deleteById(id);
        log.info("Blog deleted, id : {}",id);
    }

    public List<Blog> search(String keyword) {
        List<Blog> allBlogs = blogRepository.findAll();
        return allBlogs
                .stream().
                filter(blog -> blog.getTitle().toLowerCase().startsWith(keyword.toLowerCase()))
                .toList();
    }

    public Blog addLike(String userEmail, String blogId) {
        Blog foundBlog = blogRepository.findById(blogId).orElse(null);
        if(foundBlog == null)return null;
        if(foundBlog.getLikedBy().contains(userEmail))return null;
        foundBlog.getLikedBy().add(userEmail);
        return foundBlog;
    }

    public Blog removeLike(String userEmail, String blogId) {
        Blog foundBlog = blogRepository.findById(blogId).orElse(null);
        if(foundBlog == null)return null;
        foundBlog.getLikedBy().remove(userEmail);
        return foundBlog;
    }
}
