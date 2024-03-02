package com.aboredswe.demo.error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;



@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<Error> handleWrongPasswordException(Exception ex){
        return new ResponseEntity<>(Error.builder().error(ex.getMessage()).build()
                , HttpStatus.BAD_REQUEST);
    }

}
