// package com.example.g2t6.alert;

// import java.util.*;

// import com.example.g2t6.user.UserRepository;

// import org.springframework.beans.factory.annotation.Autowired;

// import org.springframework.http.ResponseEntity;
// import org.springframework.http.HttpStatus;
// import org.springframework.web.bind.annotation.*;
// import javax.validation.Valid;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import com.example.g2t6.mail.*;

// @RestController
// public class AlertController {

//     @Autowired
//     private AlertRepository alerts;

//     @Autowired
//     private UserRepository users;

//     @Autowired
//     private MailService mailService;

//     // public AlertController(AlertRepository alerts, UserRepository users, MailService mailService){
//     //     this.alerts = alerts;
//     //     this.users = users;
//     //     this.mailService = mailService;
//     // }

//     @GetMapping("/users/{userEmail}/alerts")
//     public List<Alert> getAllAlertsByUser(@PathVariable (value = "userEmail") String userEmail) {
//         if(!users.existsById(userEmail)) {
//             throw new UsernameNotFoundException(userEmail);
//         }
//         return alerts.findByUserEmail(userEmail);
//     }

//     @ResponseStatus(HttpStatus.CREATED)
//     @PostMapping("/users/{userEmail}/alerts")
//     public Alert addAlert(@PathVariable (value = "userEmail") String userEmail, @Valid @RequestBody Alert alert) {
//         return users.findByEmail(userEmail).map(user ->{
//             alert.setUser(user);
//             Mail mail = new Mail("waddyrocks@gmail.com", alert.getAlertDate(), alert.getAlert());
//             mailService.sendMail(mail);
//             return alerts.save(alert);
//         }).orElseThrow(() -> new UsernameNotFoundException(userEmail));
//     }

//     @PutMapping("/users/{userEmail}/alerts/{alertId}")
//     public Alert updateAlert(@PathVariable (value = "userEmail") String userEmail,
//                                  @PathVariable (value = "alertId") Long alertId,
//                                  @Valid @RequestBody Alert newAlert) {
//         if(!users.existsById(userEmail)) {
//             throw new UsernameNotFoundException(userEmail);
//         }
//         return alerts.findByIdAndUserEmail(alertId, userEmail).map(alert -> {
//             alert.setAlertDate(newAlert.getAlertDate());
//             alert.setAlert(newAlert.getAlert());
//             Mail mail = new Mail("waddyrocks@gmail.com", newAlert.getAlertDate(), newAlert.getAlert());
//             mailService.sendMail(mail);
//             return alerts.save(alert);
//         }).orElseThrow(() -> new AlertNotFoundException(alertId));
//     }

//     @DeleteMapping("/users/{userEmail}/alerts/{alertId}")
//     public ResponseEntity<?> deleteAlert(@PathVariable (value = "userEmail") String userEmail,
//                               @PathVariable (value = "alertId") Long alertId) {
        
//         if(!users.existsById(userEmail)) {
//             throw new UsernameNotFoundException(userEmail);
//         }

//         return alerts.findByIdAndUserEmail(alertId, userEmail).map(alert -> {
//             alerts.delete(alert);
//             return ResponseEntity.ok().build();
//         }).orElseThrow(() -> new AlertNotFoundException(alertId));
//     }




// }
