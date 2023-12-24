package com.aboredswe.demo.service;

import com.aboredswe.demo.model.User;
import com.aboredswe.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<Boolean> addUser(User user){
        if(user.getName() == null || user.getEmail() == null || user.getPassword()==null){
            return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST);
        }
        else if(userRepository.findByEmail(user.getEmail())!=null){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
        else{
            userRepository.save(user);
            return new ResponseEntity<>(true,HttpStatus.CREATED);
        }
    }

    public ResponseEntity<User[]> findALlUsers(){
        Iterator iterator = userRepository.findAll().iterator();
        ArrayList<User> list = new ArrayList<>();
        while(iterator.hasNext()){
            list.add((User) iterator.next());
        }
        User[] array = new User[list.size()];
        for(int i=0;i<array.length;i++) array[i] = list.get(i);
        return new ResponseEntity<>(array,HttpStatus.OK);
    }

    public ResponseEntity<User> findByEmail(String email){
        User foundUser = userRepository.findByEmail(email);
        if(foundUser == null){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(foundUser,HttpStatus.OK);
        }
    }
}
