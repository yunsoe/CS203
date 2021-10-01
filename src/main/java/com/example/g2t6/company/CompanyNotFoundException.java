package com.example.g2t6.company;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CompanyNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public CompanyNotFoundException(Long id) {
        super("Could not find company " + id);
    }
    
}
