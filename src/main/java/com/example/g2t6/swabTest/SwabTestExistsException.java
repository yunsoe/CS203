package com.example.g2t6.swabTest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import java.util.Date;
@ResponseStatus(HttpStatus.CONFLICT)
public class SwabTestExistsException extends RuntimeException{
    private static final long serialVersionUID = 1L;

    public SwabTestExistsException(Date date) {
        super("This date for this swab already exists, the date is: " + date);
    }
}
