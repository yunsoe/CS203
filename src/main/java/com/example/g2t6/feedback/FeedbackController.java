package com.example.g2t6.feedback;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.g2t6.feedback.FeedbackNotFoundException;
import com.example.g2t6.user.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@RestController
public class FeedbackController {
    private FeedbackRepository feedbacks;
    private UserRepository users;

    public FeedbackController(FeedbackRepository feedbacks, UserRepository users){
        this.feedbacks = feedbacks;
        this.users = users;
    }

    // TODO: code for emailing developers
    @PostMapping("/users/{userEmail}/feedbacks")
    public Feedback addfeedback(@PathVariable (value = "userEmail") String userEmail, @Valid @RequestBody Feedback feedback) {
        // using "map" to handle the returned Optional object from "findByEmail(UserEmail)"
        return users.findById(userEmail).map(user ->{
            feedback.setUser(user);
            return feedbacks.save(feedback);
        }).orElseThrow(() -> new UsernameNotFoundException("Email '" + userEmail + "' not found"));
    }

    //removed get, update and delete methods for feedback since we are sending emails directly to developers
}