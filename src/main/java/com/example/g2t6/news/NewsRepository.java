package com.example.g2t6.news;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.g2t6.industry.*;

import java.util.*;
import java.time.*;

@Repository
public interface NewsRepository extends JpaRepository<News, Long>{
    
    List<News> findByIndustry(Industry industry);

    List<News> findByDate(LocalDate date);

    List<News> findByCategory(String category);
    
    List<News> findByIndustryIdAndCategory(Long industryId, String category);

}
