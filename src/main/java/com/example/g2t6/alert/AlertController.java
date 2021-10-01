package com.example.g2t6.alert;

import java.util.List;

import com.example.g2t6.user.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import AlertNotFoundException
//import Alert Repo

@RestController
public class AlertController {
    private AlertRepository alerts;
    private UserRepository users;

    public AlertController(AlertRepository alerts, UserRepository users){
        this.alerts = alerts;
        this.users = users;
    }

    @GetMapping("/users/{userEmail}/alerts")
    public List<Alert> getAllAlertsByUser(@PathVariable (value = "userEmail") String userEmail) {
        if(!users.existsById(userEmail)) {
            throw new UsernameNotFoundException(userEmail);
        }
        return alerts.findByUserEmail(userEmail);
    }

    @PostMapping("/users/{userEmail}/alerts")
    public Alert addAlert(@PathVariable (value = "userEmail") String userEmail, @Valid @RequestBody Alert alert) {
        return users.findById(userEmail.map(user ->{
            alerts.setAlert(alert);
            return alerts.save(alert);
        }).orElseThrow(() -> new AlertNotFoundException(userEmail)));
    }
}
