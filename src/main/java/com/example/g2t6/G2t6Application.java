package com.example.g2t6;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
public class G2t6Application {
	/*
	private static final Logger LOGGER = LoggerFactory.getLogger(Week3Application.class);
    private static BookClient client;
	*/

	public static void main(String[] args) {
		SpringApplication.run(G2t6Application.class, args);

	}
	/*
	@Scheduled(fixedRateString = "${someJob.rate}")
	void getBooks() throws InterruptedException {
        // Our web service endpoint
        String URI = "http://localhost:8080/users";

        // Perform a GET request
        Book book = client.getUser(URI, 1L);
        LOGGER.info("[RestTemplate] GET user: " + user.getEmail());
        
	}
	*/

}

@Configuration
@EnableScheduling
@ConditionalOnProperty(name = "scheduling.enabled", matchIfMissing = true)
class SchedulingConfiguration {

}
