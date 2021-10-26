package com.example.g2t6;


import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;


@SpringBootApplication
//@EnableScheduling
//@ComponentScan({"com.example.g2t6.user.User","com.example.g2t6.security.SecurityConfig"})
public class G2t6Application {

	public static void main(String[] args) {
		SpringApplication.run(G2t6Application.class, args);

		//ApplicationContext ctx = SpringApplication.run(G2t6Application.class, args);

	}
	
	// @Bean
	// public TaskScheduler taskScheduler() {
	// 	final ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
	// 	scheduler.setPoolSize(10);
	// 	return scheduler;
	// }

	@Bean
    public HttpFirewall allowUrlSemicolonHttpFirewall() {
        StrictHttpFirewall firewall = new StrictHttpFirewall();
		firewall.setAllowSemicolon(true);
        firewall.setAllowBackSlash(true);
		firewall.setAllowedHttpMethods(Arrays.asList("GET","POST","DELETE", "PUT", "OPTIONS"));
        return firewall;
    }

}
/*
@Configuration
@EnableScheduling
@ConditionalOnProperty(name = "scheduling.enabled", matchIfMissing = true)
class SchedulingConfiguration {
	
	@Bean
	public TaskScheduler taskScheduler() {
		final ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
		scheduler.setPoolSize(10);
		return scheduler;
	}
	
}
*/
