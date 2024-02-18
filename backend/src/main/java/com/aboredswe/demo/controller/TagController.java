package com.aboredswe.demo.controller;

import com.aboredswe.demo.model.Blog;
import com.aboredswe.demo.model.Tag;
import com.aboredswe.demo.model.TagPayload;
import com.aboredswe.demo.service.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/api/tag")
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping
    public ResponseEntity<List<Tag>> getAllTags(){
        List<Tag> list = tagService.getAllTags();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @GetMapping("/{tagId}")
    public ResponseEntity<List<Blog>> getAllBlogsForTag(@PathVariable String tagId){
        List<Blog> list = tagService.getAllBlogsForTag(tagId);
        return new ResponseEntity<>(list,HttpStatus.OK);
    }
}
