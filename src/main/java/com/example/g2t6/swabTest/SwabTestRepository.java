package com.example.g2t6.swabTest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

public interface SwabTestRepository extends JpaRepository<SwabTest, Long>{
    List<SwabTest> findByUserEmail(String email);
    List<SwabTest> findBySwabResultAndActualSwabDate(boolean result,LocalDate actualSwabDate);
    List<SwabTest> findByActualSwabDate(LocalDate actualSwabDate);
    Optional<SwabTest> findByIdAndUserEmail(Long id, String userEmail);
    List<SwabTest> findByActualSwabDateBetween(LocalDate eDate, LocalDate sDate);
}
