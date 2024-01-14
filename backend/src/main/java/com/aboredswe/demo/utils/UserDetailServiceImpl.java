package com.aboredswe.demo.utils;

import com.aboredswe.demo.model.User;
import com.aboredswe.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User foundUser = userService.findByEmail(email).getBody();
        if(foundUser == null){
            throw new  UsernameNotFoundException("User not found :"+email);
        }
        return new org.springframework.security.core.userdetails.User(foundUser.getEmail(), foundUser.getPassword(), new ArrayList<>());
    }
}
