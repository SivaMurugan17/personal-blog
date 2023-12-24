package com.aboredswe.demo.service;


import com.aboredswe.demo.model.Blog;
import com.aboredswe.demo.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    public ResponseEntity<Boolean> addBlog(Blog blog){
        if(blog.getTitle() == null || blog.getContent() == null || blog.getAuthorEmail() == null){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
        else{
            blogRepository.save(blog);
            return new ResponseEntity<>(true,HttpStatus.CREATED);
        }
    }

    public ResponseEntity<Blog[]> findAllBlogs(){
        Iterator iterator = blogRepository.findAll().iterator();
        ArrayList<Blog> list = new ArrayList<>();
        while(iterator.hasNext()){
            list.add((Blog) iterator.next());
        }
        return new ResponseEntity<>((Blog[]) list.toArray(),HttpStatus.OK);
    }

    public ResponseEntity<Blog> findById(long id){
        Blog foundBlog = (Blog) blogRepository.findById(id).orElse(null);
        if(foundBlog == null){
            return  new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(foundBlog,HttpStatus.OK);
        }
    }

}
