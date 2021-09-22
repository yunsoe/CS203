package com.example.g2t6.swabTest;
import java.util.List;
import java.util.Date;

public interface SwabTestService {
    List<SwabTest> listSwabHistory(String userEmail);
    SwabTest addSwabHistory(SwabTest test);
    SwabTest updateDate(Long id,Date date);
    List<SwabTest> listSwabHistoryByResulTestsAndDate(boolean swabResult,Date actualSwabDate); // for admin to see that whose reult is positive
    //void setSwabAlert();
}
