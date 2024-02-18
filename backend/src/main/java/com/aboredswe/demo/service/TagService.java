package com.aboredswe.demo.service;

import com.aboredswe.demo.model.Blog;
import com.aboredswe.demo.model.Tag;
import com.aboredswe.demo.repository.BlogRepository;
import com.aboredswe.demo.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TagService {

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private BlogRepository blogRepository;

    public Tag addTag(String name, String blogId) {
        Tag foundTag = tagRepository.findById(name).orElse(null);
        if(foundTag == null){
            List<String> listOfBlogs = new ArrayList<>();
            listOfBlogs.add(blogId);
            Tag newTag = Tag.builder()
                    .name(name)
                    .blogs(listOfBlogs)
                    .build();
            return tagRepository.save(newTag);
        }
        else {
            foundTag.getBlogs().add(blogId);
            return tagRepository.save(foundTag);
        }
    }

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public List<Blog> getAllBlogsForTag(String tagId) {
        Tag foundTag = tagRepository.findById(tagId).orElse(null);
        if(foundTag == null)return null;
        List<String> listOfBlogIds = foundTag.getBlogs();
        if(listOfBlogIds == null)return new ArrayList<>();
        List<Blog> result = new ArrayList<>();
        for(String blogId : listOfBlogIds){
            Optional<Blog> foundBlog = blogRepository.findById(blogId);
            foundBlog.ifPresent(result::add);
        }
        return result;
    }

    public void deleteBlogIdFromTag(String blogId,String tagName){
        Tag tag = tagRepository.findById(tagName).orElse(null);
        if(tag == null)return;
        tag.getBlogs().remove(blogId);
        if (tag.getBlogs().isEmpty()){
            tagRepository.deleteById(tagName);
        }
        else{
            tagRepository.save(tag);
        }
    }
}
