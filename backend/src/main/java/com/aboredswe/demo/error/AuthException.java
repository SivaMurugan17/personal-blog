package com.aboredswe.demo.error;

public class AuthException extends Exception{
    private String error;

    public AuthException(String error){
        super(error);
    }
}
