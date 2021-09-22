package com.example.g2t6.industry;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) // 404 Error
public class IndustryNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public IndustryNotFoundException(Long id) {
        super("Could not find industry " + id);
    }
    
}
