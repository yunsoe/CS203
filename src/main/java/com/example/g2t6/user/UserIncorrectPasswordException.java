package com.example.g2t6.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED) 
public class UserIncorrectPasswordException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public UserIncorrectPasswordException(String userEmail) {
        super("Incorrect password for email " + userEmail);
    }
}