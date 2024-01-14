package com.aboredswe.demo.service;

import com.aboredswe.demo.model.User;
import com.aboredswe.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User addUser(User user){
        if(user.getName() == null || user.getEmail() == null || user.getPassword()==null){
            return null;
        }
        else if(userRepository.findByEmail(user.getEmail()).isPresent()){
            return null;
        }
        else{
            userRepository.save(user);
            return user;
        }
    }

    public List<User> findALlUsers(){
        return userRepository.findAll();
    }

    public User findByEmail(String email){
        return userRepository.findByEmail(email).orElse(null);
    }
}
