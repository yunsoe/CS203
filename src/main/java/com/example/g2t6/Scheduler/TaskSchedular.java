package com.example.g2t6.Scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Date;
import com.example.g2t6.user.*;
import com.example.g2t6.mail.*;
import com.example.g2t6.alert.*;

@Component
public class TaskSchedular {

    private AlertController a;
    private static final Logger LOGGER = LoggerFactory.getLogger(TaskSchedular.class);

    public TaskSchedular(AlertController a) {
        this.a = a;
        User u = new User("waddyrocks@gmail.com", "Yun Waddy Soe", "12345678", "role", "a");

    }

    @Scheduled(fixedRate = 2000L)
    public void taskSchedular() {
        // Our web service endpoint
        String URI = "http://localhost:8080/users/waddyrocks@gmail.com/alerts";

        // Perform a GET request
        Book book = client.getBook(URI, 1L);
        LOGGER.info("[RestTemplate] GET book: " + book.getTitle());
    }
}

