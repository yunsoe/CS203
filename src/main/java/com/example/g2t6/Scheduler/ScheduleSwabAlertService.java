// package com.example.g2t6.Scheduler;

// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.concurrent.ScheduledFuture;

// import javax.annotation.PostConstruct;
// import javax.annotation.PreDestroy;

// import com.example.g2t6.alert.Alert;
// import com.example.g2t6.alert.AlertController;
// import com.example.g2t6.alert.AlertServiceImpl;
// import com.example.g2t6.mail.Mail;
// import com.example.g2t6.mail.MailService;
// import com.example.g2t6.swabTest.SwabTestRepository;
// import com.example.g2t6.swabTestDetail.SwabTestDetail;
// import com.example.g2t6.user.User;
// import com.example.g2t6.user.UserRepository;

// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.context.annotation.Bean;
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
//     List<ScheduledFuture> scheduledFuture;
//     TaskScheduler taskScheduler;

//     @Autowired
//     private AlertServiceImpl alertServiceImpl;

//     @Autowired
//     private SwabTestRepository swabTestRepository;

//     @Autowired
//     private UserRepository userRepository;


//     public String getSendAlertRate() {
        
//     }

//     @SuppressWarnings("rawtypes")
//     public void reSchedule(ArrayList<String> cronExpressionStr){
//         if(taskScheduler== null){
//             this.taskScheduler = new ConcurrentTaskScheduler();
//         }
//         if (this.scheduledFuture != null) {
//             for (ScheduledFuture s:scheduledFuture) {
//                 s.cancel(true);
//             }
//         }
//         for (String c:cronExpressionStr) {
//             this.scheduledFuture.add(this.taskScheduler.schedule(this, new CronTrigger(c)));
//         }
//         //this.scheduledFuture = this.taskScheduler.schedule(this, new CronTrigger(cronExpressionStr));
//     }

//     @Override
//     public void run() {
//         LocalDateTime now = LocalDateTime.now();
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

