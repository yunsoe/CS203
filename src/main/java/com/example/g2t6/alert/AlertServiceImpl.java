package com.example.g2t6.alert;

import java.util.List;
import java.util.Optional;

import com.example.g2t6.mail.Mail;
import com.example.g2t6.mail.MailService;
import com.example.g2t6.user.User;
import com.example.g2t6.user.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AlertServiceImpl implements AlertService {

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MailService mailService;

    // public AlertServiceImpl() {

    // }

    // public AlertServiceImpl(AlertRepository alertRepository, UserRepository userRepository) {
    //     this.alertRepository = alertRepository;
    //     this.userRepository = userRepository;
    // }

    /** 
    * @param user/employee's email
    * @return a list of alerts configured
    */
    @Override
    public List<Alert> getAllAlertsByUser(String userEmail) {
        if(!userRepository.existsById(userEmail)) {
            throw new UsernameNotFoundException(userEmail);
        }
        return alertRepository.findByUserEmail(userEmail);
    }

    /**
    * @param user/employee's email and the new alert
    * @return the alert configured
    */
    @Override
    public Alert addAlert(String userEmail, Alert alert) {
        return userRepository.findByEmail(userEmail).map(user ->{
            alert.setUser(user);
            Mail mail = new Mail(userEmail, alert.getAlertDate(), alert.getAlert());
            mailService.sendMail(mail);
            return alertRepository.save(alert);
        }).orElseThrow(() -> new UsernameNotFoundException(userEmail));
    }

    /**
    * @param user/employee's email, alert ID and new alert
    * @return the alert updated
    */
    @Override
    public Alert updateAlert(String userEmail, long alertId, Alert newAlert) {
        if(!userRepository.existsById(userEmail)) {
            throw new UsernameNotFoundException(userEmail);
        }
        return alertRepository.findByIdAndUserEmail(alertId, userEmail).map(alert -> {
            alert.setAlertDate(newAlert.getAlertDate());
            alert.setAlert(newAlert.getAlert());
            Mail mail = new Mail(userEmail, newAlert.getAlertDate(), newAlert.getAlert());
            mailService.sendMail(mail);
            return alertRepository.save(alert);
        }).orElseThrow(() -> new AlertNotFoundException(alertId));
    }

    // @Override
    // public Alert deleteAlert(String userEmail, long alertId) {
    //     if(!userRepository.existsById(userEmail)) {
    //         throw new UsernameNotFoundException(userEmail);
    //     }

    //     return alertRepository.findByIdAndUserEmail(alertId, userEmail).map(alert -> {
    //         alertRepository.delete(alert);
    //     }).orElseThrow(() -> new AlertNotFoundException(alertId));
    // }
}
