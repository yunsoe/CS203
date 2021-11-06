package com.example.g2t6.Scheduler;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ScheduledFuture;

import javax.annotation.PostConstruct;

import com.example.g2t6.alert.AlertService;
import com.example.g2t6.swabTestDetail.SwabTestDetail;
import com.example.g2t6.swabTestDetail.SwabTestDetailRepository;
import com.example.g2t6.user.User;
import com.example.g2t6.user.UserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.SchedulingException;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ConcurrentTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;

@Service
public class ScheduleSwabAlert {
    private static final Logger LOGGER = LoggerFactory.getLogger(ScheduleSwabAlert.class);

    @SuppressWarnings("rawtypes")
    List<ScheduledFuture> scheduledFuture;
    TaskScheduler taskScheduler;

    @Autowired
    private SwabTestDetailRepository swabTestDetailRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AlertService alertService;

    @SuppressWarnings("rawtypes")
    public void Schedule() {
        if(taskScheduler == null){
            this.taskScheduler = new ConcurrentTaskScheduler();
        }
        if (this.scheduledFuture != null) {
            for (ScheduledFuture s:scheduledFuture) {
                s.cancel(true);
            }
            scheduledFuture = new ArrayList<>();
        } else {
            scheduledFuture = new ArrayList<>();
        }
        List<User> users = userRepository.findAll();
        for (User u:users) {
            List<SwabTestDetail> swabTestDetails = swabTestDetailRepository.findByuserEmail(u.getEmail());
            for (SwabTestDetail s:swabTestDetails) {
                String cronExpressionStr = "* " + s.getAlertTime().substring(3) + " " + s.getAlertTime().substring(0, 2) + " * * " + s.getAlertDay();
                //String cron = "0/10 * * * * *";
                this.scheduledFuture.add(this.taskScheduler.schedule(new RunnableTask(u, s, alertService), new CronTrigger(cronExpressionStr)));
            }
        }
    }

    @PostConstruct
    @Scheduled(cron = "0 0/1 * * * *")
    public void initializeScheduler() {
        try {
            this.Schedule();
            System.out.println("Scheduler re-initialized.");
        } catch (SchedulingException e) {
            LOGGER.error(e.getMessage(), e);
        }
    }

}
