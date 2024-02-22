package com.aboredswe.demo.error;

public class WrongPasswordException extends Exception{
    private String message;

    public WrongPasswordException(String message){
        super(message);
    }
}
