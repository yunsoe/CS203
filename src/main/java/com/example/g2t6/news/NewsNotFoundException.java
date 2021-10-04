package com.example.g2t6.news;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) 
public class NewsNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public NewsNotFoundException(Long id) {
        super("Could not find the news " + id);
    }
    
}
