package com.aboredswe.demo.service;

import com.aboredswe.demo.error.UserNotFoundException;
import com.aboredswe.demo.model.User;
import com.aboredswe.demo.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private AuthRepository authRepository;

    public User addUser(User user) {
        return authRepository.save(user);
    }

    public User findByEmail(String email) throws UserNotFoundException {
        Optional<User> foundUser = authRepository.findByEmail(email);
        if(foundUser.isEmpty()){
            throw new UserNotFoundException();
        }
        return foundUser.get();
    }
}
