package com.example.g2t6.swabTest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class SwabTestNotFoundException extends RuntimeException{
    private static final long serialVersionUID = 1L;
    public SwabTestNotFoundException(Long id){
        super("Could not find swab Test History " + id);

    } 
}
