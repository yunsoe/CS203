package com.example.g2t6.swabTest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface swabTestRepository extends JpaRepository<swabTest, Long>{
    List<SwabTest> findByUserEmail(String userEmail);

}
