package com.example.g2t6.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(
  prePostEnabled = true,
  securedEnabled = true,
  jsr250Enabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    private UserDetailsService userDetailsService;

    public SecurityConfig(UserDetailsService userSvc){
        this.userDetailsService = userSvc;
    }
    
    /** 
     * Attach the user details and password encoder.
     */
    @Override
    protected void configure(AuthenticationManagerBuilder auth)
        throws Exception {
        auth
        .userDetailsService(userDetailsService)
        .passwordEncoder(encoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
        .httpBasic()
            .and() //  "and()"" method allows us to continue configuring the parent
        .authorizeRequests()
            //.antMatchers(HttpMethod.GET, "/books", "/books/**").permitAll() // Anyone can view books and reviews
            .antMatchers(HttpMethod.GET, "/swabTests/*").hasRole("ADMIN")
            .antMatchers(HttpMethod.GET, "/swabTests").hasRole("ADMIN")
            .antMatchers(HttpMethod.POST, "/users/*/feedbacks").hasAnyRole("ADMIN", "USER")
            .antMatchers(HttpMethod.DELETE, "/users/*/*").hasRole("ADMIN")
            .antMatchers(HttpMethod.PUT, "/users/*/*/changePassword").hasAnyRole("ADMIN", "USER")
            .and()
        .csrf().disable() // CSRF protection is needed only for browser based attacks
        //not sure abt this part
        //userdetailsservice uses a username by default but our username is email
        //https://stackoverflow.com/questions/50673400/how-to-log-in-by-email-instead-of-username-in-spring-security
        .formLogin()
        .loginPage("/login")
        .usernameParameter("email") // specify username as email
        .permitAll()
        //
            .and()
        .logout()
        .permitAll()
            .and()
        .headers().disable(); // Disable the security headers, as we do not return HTML in our service
    }

    /**
     * @Bean annotation is used to declare a PasswordEncoder bean in the Spring application context. 
     * Any calls to encoder() will then be intercepted to return the bean instance.
     */
    @Bean
    public BCryptPasswordEncoder encoder() {
        // auto-generate a random salt internally
        return new BCryptPasswordEncoder();
    }
}
 