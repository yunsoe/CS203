package com.example.g2t6.event;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;



@ResponseStatus(HttpStatus.NOT_FOUND) // 404 Error
public class EventNotFoundException  extends RuntimeException {
    
    private static final long serialVersionUID = 1L;

    public EventNotFoundException(Long id) {
        super("Could not find event " + id);
    }
}