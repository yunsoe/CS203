package com.example.g2t6.mail;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import javax.mail.MessagingException;

@RestController
public class MailController {

    @Autowired
    private MailService mailService;

    // public MailController (MailService ms){
    //     this.mailService = ms;
    // }

    /**
    * Gets a list of all the users
    * @param mail Mail to be sent
    * @return ResponseEntity<String>
    */
    @PostMapping("/send")
    public ResponseEntity<String> sendMail(@RequestBody Mail mail) {
        mailService.sendMail(mail);
        return new ResponseEntity<>("Email Sent successfully", HttpStatus.OK);
    }
}
