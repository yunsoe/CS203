package com.example.g2t6.alert;

import java.util.List;

public interface AlertService {
    List<Alert> getAllAlertsByUser(String userEmail);
    Alert addAlert(String userEmail, Alert alert);
    Alert updateAlert(String userEmail, long alertId, Alert newAlert);
    //Alert deleteAlert(String userEmail, long alertId);
}
