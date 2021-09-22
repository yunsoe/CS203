package com.example.g2t6.swabTest;
import java.util.List;
import java.util.Date;

public interface swabTestService {
    List<SwabTest> listSwabHistory(String userEmail);
    SwabTest addSwabHistory(SwabTest test);
    Swabtest updateDate(Date date);
    void setSwabAlert();
}
