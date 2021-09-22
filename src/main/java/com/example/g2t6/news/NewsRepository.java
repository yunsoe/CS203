package com.example.g2t6.News;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.time.*;

@Repository
public interface NewsRepository extends JpaRepository<News, Long>{
    
    List<News> findByIndustry(String industry);
    List<News> findByDate(LocalDate date);
    List<News> findByCategory(String category);
    List<News> findByIndustryAndCategory(String industry, String category);

}
