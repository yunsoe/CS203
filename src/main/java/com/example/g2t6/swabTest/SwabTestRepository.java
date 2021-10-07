package com.example.g2t6.swabTest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;


public interface SwabTestRepository extends JpaRepository<SwabTest, Long>{
    List<SwabTest> findByUserEmail(String email);
    List<SwabTest> findBySwabResultAndActualSwabDate(boolean result,String actualSwabDate);
    List<SwabTest> findByActualSwabDate(String actualSwabDate);
    Optional<SwabTest> findByIdAndUserEmail(Long id, String userEmail);

}
