package com.example.g2t6.swabTestDetail;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class SwabTestDetailNotFoundException extends RuntimeException{
    private static final long serialVersionUID = 1L;
    public SwabTestDetailNotFoundException(Long id){
        super("Could not find swab Test Detail " + id);

    } 
}
