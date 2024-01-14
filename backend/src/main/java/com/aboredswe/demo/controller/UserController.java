package com.aboredswe.demo.controller;

import com.aboredswe.demo.model.User;
import com.aboredswe.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user){
        User addedUser = userService.addUser(user);
        if(addedUser == null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        else{
            return new ResponseEntity<>(addedUser,HttpStatus.CREATED);
        }
    }

    @GetMapping
    public ResponseEntity<List<User>> findAllUsers(){
        List<User> users =  userService.findALlUsers();
        return new ResponseEntity<>(users,HttpStatus.OK);
    }

    @GetMapping("/{email}")
    public ResponseEntity<User> findUserByEmail(@PathVariable String email){
        User foundUser = userService.findByEmail(email);
        if(foundUser == null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(foundUser,HttpStatus.OK);
        }
    }
}
