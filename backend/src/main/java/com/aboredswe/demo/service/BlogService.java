package com.aboredswe.demo.service;


import com.aboredswe.demo.model.Blog;
import com.aboredswe.demo.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    public Blog addBlog(Blog blog){
        if(blog.getTitle() == null || blog.getContent() == null || blog.getAuthorEmail() == null){
            return null;
        }
        else{
            blogRepository.save(blog);
            return blog;
        }
    }

    public List<Blog> findAllBlogs(){
        return blogRepository.findAll();
    }

    public Blog findById(String id){
        return blogRepository.findById(id).orElse(null);
    }

    public List<Blog> findBlogsByEmail(String email){
        return blogRepository.findAll().stream().filter(blog -> blog.getAuthorEmail().equals(email)).toList();
    }
}
