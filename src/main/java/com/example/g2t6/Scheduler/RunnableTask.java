package com.example.g2t6.Scheduler;

import java.time.LocalDateTime;

import com.example.g2t6.alert.Alert;
import com.example.g2t6.alert.AlertServiceImpl;
import com.example.g2t6.mail.MailService;
import com.example.g2t6.swabTestDetail.SwabTestDetail;
import com.example.g2t6.user.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class RunnableTask implements Runnable {
    private User user;

    private SwabTestDetail swabTestDetail;

    @Autowired
    private AlertServiceImpl alertServiceImpl;

    // @Autowired
    // private MailService mailService;

    public RunnableTask(User user, SwabTestDetail swabTestDetail) {
        this.user = user;
        this.swabTestDetail = swabTestDetail;
    }   
    
    @Override
    public void run() {
        LocalDateTime now = LocalDateTime.now();
        alertServiceImpl.addAlert(user.getEmail(), new Alert(now.toString(), swabTestDetail.getMessage()));
    }
}
