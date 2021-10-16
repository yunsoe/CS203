package com.example.g2t6.Scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Date;

@Component
public class TaskSchedular {

    private static final Logger LOGGER = LoggerFactory.getLogger(TaskSchedular.class);

    @Scheduled(fixedRate = 2000L)
    public void taskSchedular() {
        LOGGER.info("Now is " + new Date());
    }
}

