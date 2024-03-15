package com.aboredswe.demo.service;


import com.aboredswe.demo.error.BlogNotFoundException;
import com.aboredswe.demo.error.TagNotFoundException;
import com.aboredswe.demo.error.UserNotFoundException;
import com.aboredswe.demo.model.Blog;
import com.aboredswe.demo.model.BlogPostPayload;
import com.aboredswe.demo.model.Comment;
import com.aboredswe.demo.model.User;
import com.aboredswe.demo.repository.BlogRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BlogService {
    @Autowired
    private TagService tagService;

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private AuthService authService;

    public Blog addBlog(@Valid BlogPostPayload blogPostPayload) throws UserNotFoundException {
        Blog blog = blogRepository.save(buildBlog(blogPostPayload));
        addTags(blog);
        return blog;
    }

    private Blog buildBlog(BlogPostPayload blogPostPayload) throws UserNotFoundException {
        User foundUser = authService.findByEmail(blogPostPayload.getAuthorEmail());
        return Blog.builder()
                .title(blogPostPayload.getTitle())
                .content(blogPostPayload.getContent())
                .author(foundUser)
                .date(new Date())
                .tags(blogPostPayload.getTags())
                .likedBy(new ArrayList<String>())
                .comments(new ArrayList<Comment>())
                .build();
    }

    private void addTags(Blog blog){
        for(String tagName : blog.getTags()){
            tagService.addTag(tagName,blog.getId());
        }
    }
    public List<Blog> findAllBlogs(){
        return blogRepository.findAll();
    }

    public Blog findById(String id) throws BlogNotFoundException {
        Optional<Blog> foundBlog = blogRepository.findById(id);
        if(foundBlog.isEmpty()){
            throw new BlogNotFoundException();
        }
        return foundBlog.get();
    }

    public List<Blog> findBlogsByEmail(String email){
        return blogRepository.findAll()
                .stream()
                .filter(blog -> blog.getAuthor().getEmail().equals(email))
                .toList();
    }

    public Blog editBlog(Blog blog) {
        addTags(blog);
        return blogRepository.save(blog);
    }

    public void deleteBlog(String blogId) throws BlogNotFoundException, TagNotFoundException {
        Blog foundBlog = findById(blogId);
        deleteBlogIdFromTags(foundBlog);
        blogRepository.deleteById(blogId);
    }

    private void deleteBlogIdFromTags(Blog blog) throws TagNotFoundException {
        for(String tagName : blog.getTags()){
            tagService.deleteBlogIdFromTag(blog.getId(), tagName);
        }
    }

    public List<Blog> search(String keyword) {
        List<Blog> allBlogs = blogRepository.findAll();
        return allBlogs
                .stream().
                filter(blog -> blog.getTitle().toLowerCase().startsWith(keyword.toLowerCase()))
                .toList();
    }

    public Blog addLike(String userEmail, String blogId) throws BlogNotFoundException {
        Blog foundBlog = findById(blogId);
        if(!foundBlog.getLikedBy().contains(userEmail)){
            foundBlog.getLikedBy().add(userEmail);
            editBlog(foundBlog);
        }
        return foundBlog;
    }

    public Blog removeLike(String userEmail, String blogId) throws BlogNotFoundException {
        Blog foundBlog = findById(blogId);
        if(foundBlog.getLikedBy().contains(userEmail)){
            foundBlog.getLikedBy().remove(userEmail);
            editBlog(foundBlog);
        }
        return foundBlog;
    }
}
