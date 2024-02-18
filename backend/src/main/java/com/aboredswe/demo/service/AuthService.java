package com.aboredswe.demo.service;

import com.aboredswe.demo.model.User;
import com.aboredswe.demo.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthRepository authRepository;

    public User addUser(User user) {
        return authRepository.save(user);
    }

    public User findByEmail(String email) {
        return authRepository.findByEmail(email).orElse(null);
    }
}
