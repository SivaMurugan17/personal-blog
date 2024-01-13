package com.aboredswe.demo.repository;

import com.aboredswe.demo.model.Blog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends MongoRepository<Blog,String> {
}
