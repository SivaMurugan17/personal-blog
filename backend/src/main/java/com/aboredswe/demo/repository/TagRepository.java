package com.aboredswe.demo.repository;

import com.aboredswe.demo.model.Tag;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends MongoRepository<Tag,String> {
}
