package com.example.g2t6.mail;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

@RestController
public class MailController {
    private MailService mailService;

    public MailController (MailService ms){
        this.mailService = ms;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendMail(@RequestBody Mail mail) {
        mailService.sendMail(mail);
        return new ResponseEntity<>("Email Sent successfully", HttpStatus.OK);
    }
}
