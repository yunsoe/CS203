package com.example.g2t6.feedback;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.*;
import com.example.g2t6.user.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.example.g2t6.mail.*;

@RestController
public class FeedbackController {
    private FeedbackRepository feedbacks;
    private UserRepository users;
    private MailService mailService;

    public FeedbackController(FeedbackRepository feedbacks, UserRepository users, MailService mailService){
        this.feedbacks = feedbacks;
        this.users = users;
        this.mailService = mailService;
    }

    // TODO: code for emailing developers
    @PostMapping("/users/{userEmail}/feedbacks")
    public Feedback addfeedback(@PathVariable (value = "userEmail") String userEmail, @Valid @RequestBody Feedback feedback) {
        // using "map" to handle the returned Optional object from "findByEmail(UserEmail)"
        return users.findById(userEmail).map(user ->{
            feedback.setUser(user);
            Mail mail = new Mail("zxnlee00@gmail.com", feedback.getTitle(), feedback.getDetails());
            mailService.sendMail(mail);
            return feedbacks.save(feedback);
        }).orElseThrow(() -> new UsernameNotFoundException("Email '" + userEmail + "' not found"));
    }

    //removed get, update and delete methods for feedback since we are sending emails directly to developers
}