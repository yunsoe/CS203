package com.example.g2t6.Scheduler;

import java.time.LocalDateTime;
import java.util.concurrent.ScheduledFuture;

import javax.annotation.PostConstruct;

import com.example.g2t6.alert.Alert;
import com.example.g2t6.alert.AlertController;
import com.example.g2t6.mail.Mail;
import com.example.g2t6.mail.MailService;
import com.example.g2t6.swabTestDetail.SwabTestDetail;
import com.example.g2t6.user.User;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

@Component
public class ScheduleSwabAlert implements Runnable {
    
    @SuppressWarnings("rawtypes")
    ScheduledFuture scheduledFuture;
    TaskScheduler taskScheduler;

    @Autowired
    private AlertController alertController;

    @Autowired
    private User user;

    //@Autowired
    //private Alert alert;

    @Autowired
    private SwabTestDetail swabTestDetail;

    //@Autowired
    //private MailService mailService;

    public ScheduleSwabAlert(AlertController a, User u, SwabTestDetail s) {
        this.alertController = a;
        this.user = u;
        this.swabTestDetail = s;
    }

    public String getSendAlertRate() {
        String alertRate = this.swabTestDetail.getSendAlertTime();
        return alertRate;
        //return "0/5 * * * * *";
    }

    public void reSchedule(String cronExpressionStr){
        if(taskScheduler== null){
            this.taskScheduler = new ConcurrentTaskScheduler();
        }
        if (this.scheduledFuture != null) {
            this.scheduledFuture.cancel(true);
        }
        this.scheduledFuture = this.taskScheduler.schedule(this, new CronTrigger(cronExpressionStr));
    }

    @Override
    public void run() {
        LocalDateTime now = LocalDateTime.now();
        String message = "Reminder: Swab test on Monday 9:00 am.";
        //Mail mail = new Mail("waddyrocks@gmail.com", now.toString(), message);
        //mailService.sendMail(mail);
        //System.out.println("Mail sent");
        
        Alert newAlert = new Alert(now.toString(), message);
        this.alertController.addAlert(this.user.getEmail(), newAlert);
    }

    @PostConstruct
    public void initializeScheduler() {
        //this.user = new User("waddyrocks@gmail.com", "Yun", "abc12345678", "testUser", "None");
        this.reSchedule(getSendAlertRate());
    }
}

