package com.aboredswe.demo.controller;

import com.aboredswe.demo.error.AuthException;
import com.aboredswe.demo.error.BlogNotFoundException;
import com.aboredswe.demo.error.TagNotFoundException;
import com.aboredswe.demo.model.Blog;
import com.aboredswe.demo.model.Tag;
import com.aboredswe.demo.model.TagPayload;
import com.aboredswe.demo.service.TagService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController()
@RequestMapping("/api/tag")
public class TagController {

    @Autowired
    private TagService tagService;

    @GetMapping
    public ResponseEntity<List<Tag>> getAllTags(){
        List<Tag> list = tagService.getAllTags();
        log.info("Request: GET /tag, found tags: {}",list);
        return new ResponseEntity<>(list,HttpStatus.OK);
    }

    @GetMapping("/{tagId}")
    public ResponseEntity<List<Blog>> getAllBlogsForTag(@PathVariable String tagId) throws AuthException {
        try {
            List<Blog> list = tagService.getAllBlogsForTag(tagId);
            log.info("Request: GET /tag/tagId, Found blogs for tag {}:{}",tagId,list);
            return new ResponseEntity<>(list,HttpStatus.OK);
        } catch (TagNotFoundException e) {
            throw new AuthException("Tag not found");
        } catch (BlogNotFoundException e) {
            throw new AuthException("Blog not found");
        }
    }
}
