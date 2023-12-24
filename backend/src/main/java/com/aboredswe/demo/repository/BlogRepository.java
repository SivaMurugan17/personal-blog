package com.aboredswe.demo.repository;

import com.aboredswe.demo.model.Blog;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends CrudRepository<Blog,Long> {
}
