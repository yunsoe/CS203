package com.example.g2t6.feedback;

import java.util.List;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.*;
import com.example.g2t6.user.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.g2t6.mail.*;

@RestController
@CrossOrigin
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbacks;

    @Autowired
    private UserRepository users;

    @Autowired
    private MailService mailService;
    
    /**
    * Add a new feedback
    * @param userEmail Email of user adding the feedback
    * @param feedback Feedback to be added
    * @exception UsernameNotFoundException User with the email specified was not found
    * @return The newly added feedback
    */
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/users/{userEmail}/feedbacks")
    public Feedback addfeedback(@PathVariable (value = "userEmail") String userEmail, @Valid @RequestBody Feedback feedback) {
        // using "map" to handle the returned Optional object from "findByEmail(UserEmail)"
        return users.findById(userEmail).map(user ->{
            feedback.setUser(user);
            Mail mail = new Mail("cs203grp6@gmail.com", "New Feedback - " + feedback.getTitle(), "Title: " + feedback.getTitle() + "\nDetails: " + feedback.getDetails());
            mailService.sendMail(mail);
            return feedbacks.save(feedback);
        }).orElseThrow(() -> new UsernameNotFoundException("Email '" + userEmail + "' not found"));
    }

    /**
    * Gets a list of all the feedbacks
    * @return List of all feedbacks
    */
    @GetMapping("/feedbacks")
    public List<Feedback> getFeedbacks() {
        return feedbacks.findAll();    
    }

    //removed update and delete methods for feedback since we are sending emails directly to developers
}