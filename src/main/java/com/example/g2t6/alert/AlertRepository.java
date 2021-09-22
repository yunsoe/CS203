package com.example.g2t6.alert;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;

@Repository
public interface AlertRepository extends JpaRepository <Alert, Long>{
    List<Alert> findByUserEmail(String userEmail);
    Optional<Alert> findById(String userEmail, long id);
    
}
