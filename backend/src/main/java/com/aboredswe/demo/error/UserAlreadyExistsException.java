package com.aboredswe.demo.error;

public class UserAlreadyExistsException extends Exception{
    private String message;

    public UserAlreadyExistsException(String message){
        super(message);
    }
}
