package com.aboredswe.demo.controller;

import com.aboredswe.demo.model.User;
import com.aboredswe.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Boolean> addUser(@RequestBody User user){
        return userService.addUser(user);
    }

    @GetMapping
    public ResponseEntity<User[]> findAllUsers(){
        return userService.findALlUsers();
    }

    @GetMapping("/{email}")
    public ResponseEntity<User> findUserByEmail(@PathVariable String email){
        return userService.findByEmail(email);
    }
}
