package com.example.g2t6.swabTest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface SwabTestRepository extends JpaRepository<SwabTest, Long>{
    List<SwabTest> findByUserEmail(String email);
    List<SwabTest> findBySwabResultAndDate(boolean result,String actualSwabDate);
    List<SwabTest> findByActualSwabDate(String actualSwabDate);

}
