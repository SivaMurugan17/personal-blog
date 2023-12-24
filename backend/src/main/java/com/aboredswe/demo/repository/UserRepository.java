package com.aboredswe.demo.repository;

import com.aboredswe.demo.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository {
    User findByEmail(String email);
}
