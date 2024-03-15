package com.aboredswe.demo.service;

import com.aboredswe.demo.error.BlogNotFoundException;
import com.aboredswe.demo.error.TagNotFoundException;
import com.aboredswe.demo.model.Blog;
import com.aboredswe.demo.model.Tag;
import com.aboredswe.demo.repository.BlogRepository;
import com.aboredswe.demo.repository.TagRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private BlogRepository blogRepository;

    public Tag addTag(String name, String blogId) {
        try {
            Tag tag = findByName(name);
            tag.getBlogs().add(blogId);
            return tagRepository.save(tag);
        } catch (TagNotFoundException e) {
            Set<String> blogs = new HashSet<>();
            blogs.add(blogId);
            Tag tag = Tag.builder()
                    .name(name.toLowerCase())
                    .blogs(blogs)
                    .build();
            return tagRepository.save(tag);
        }
    }

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public List<Blog> getAllBlogsForTag(String tagName) throws TagNotFoundException, BlogNotFoundException {
        Tag tag = findByName(tagName);
        Set<String> listOfBlogIds = tag.getBlogs();
        List<Blog> result = new ArrayList<>();
        for(String blogId : listOfBlogIds){
            Optional<Blog> foundBlog = blogRepository.findById(blogId);
            if(foundBlog.isPresent()){
                result.add(foundBlog.get());
            }
        }
        return result;
    }

    public void deleteBlogIdFromTag(String blogId,String tagName) throws TagNotFoundException {
        Tag tag = findByName(tagName);
        tag.getBlogs().remove(blogId);
        if (tag.getBlogs().isEmpty()){
            tagRepository.deleteById(tagName);
        }
        else{
            tagRepository.save(tag);
        }
    }

    private Tag findByName(String name) throws TagNotFoundException {
        Optional<Tag> foundTag = tagRepository.findById(name);
        if(foundTag.isEmpty()){
            throw new TagNotFoundException();
        }
        return foundTag.get();
    }
}
