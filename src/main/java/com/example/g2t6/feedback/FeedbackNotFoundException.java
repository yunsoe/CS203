package com.example.g2t6.feedback;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) // 404 Error
public class FeedbackNotFoundException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public FeedbackNotFoundException(Long id) {
        super("Could not find feedback " + id);
    }
}