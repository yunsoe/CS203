// package com.example.g2t6.Scheduler;

// import java.time.LocalDateTime;
// import java.util.concurrent.ScheduledFuture;

// import javax.annotation.PostConstruct;
// import javax.annotation.PreDestroy;

// import com.example.g2t6.alert.Alert;
// import com.example.g2t6.alert.AlertController;
// import com.example.g2t6.mail.Mail;
// import com.example.g2t6.mail.MailService;
// import com.example.g2t6.swabTestDetail.SwabTestDetail;
// import com.example.g2t6.user.User;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.scheduling.SchedulingException;
// import org.springframework.scheduling.TaskScheduler;
// import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
// import org.springframework.scheduling.support.CronTrigger;
// import org.springframework.stereotype.Component;
// import org.springframework.stereotype.Controller;
// import org.springframework.stereotype.Service;

// @Service
// public class ScheduleSwabAlertService implements Runnable {
//     private static final Logger LOGGER = LoggerFactory.getLogger(ScheduleSwabAlertService.class);
    
//     @SuppressWarnings("rawtypes")
//     ScheduledFuture scheduledFuture;
//     TaskScheduler taskScheduler;

//     @Autowired
//     private AlertController alertController;

//     @Autowired
//     private User user;

//     @Autowired
//     private SwabTestDetail swabTestDetail;

//     //@Autowired
//     //private MailService mailService;

//     public ScheduleSwabAlertService(AlertController a, User u, SwabTestDetail s) {
//         this.alertController = a;
//         this.user = u;
//         this.swabTestDetail = s;
//     }

//     public String getSendAlertRate() {
//         String alertDay = this.swabTestDetail.getAlertDay();
//         String alertTime = this.swabTestDetail.getAlertTime();
//         String alertRate = "* " + alertTime.substring(3) + " " + alertTime.substring(0, 2) + " ? * " + alertDay;
//         return alertRate;
//         //return "0/5 * * * * *";
//     }

//     public void reSchedule(String cronExpressionStr){
//         if(taskScheduler== null){
//             this.taskScheduler = new ConcurrentTaskScheduler();
//         }
//         if (this.scheduledFuture != null) {
//             this.scheduledFuture.cancel(true);
//         }
//         this.scheduledFuture = this.taskScheduler.schedule(this, new CronTrigger(cronExpressionStr));
//     }

//     @Override
//     public void run() {
//         LocalDateTime now = LocalDateTime.now();
//         String message = "Reminder: Swab test on " + this.swabTestDetail.getStartDate();
//         //Mail mail = new Mail("waddyrocks@gmail.com", now.toString(), message);
//         //mailService.sendMail(mail);
//         //System.out.println("Mail sent");
        
//         Alert newAlert = new Alert(now.toString(), message);
//         this.alertController.addAlert(this.user.getEmail(), newAlert);
//     }

//     @PostConstruct
//     public void initializeScheduler() {
//         //this.user = new User("waddyrocks@gmail.com", "Yun", "abc12345678", "testUser", "None");
//         try {
//             this.reSchedule(getSendAlertRate());
//         } catch (SchedulingException e) {
//             LOGGER.error(e.getMessage(), e);
//         }
//     }
// }

