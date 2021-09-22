package com.example.g2t6.News;

import java.util.*;

import org.springframework.context.annotation.Primary;

import java.time.*;

@Primary
public interface NewsService {
    
    List<News> getAllNews();
    List<News> getNewsByIndustry(String industry);
    List<News> getNewsByDate(LocalDate date);
    List<News> getNewsByCategory(String category);
    List<News> getNewsByIndustryAndCategory(String industry, String category);
    Optional<News> getNewsById(Long id);

    News addNews(News news);
    News addNewsOnly(News news);
    News addCasesOnly(News cases);

    News updateNews(Long id, News newsLatest);
    // News updateCases(Long id, News casesLatest);

    void deleteNews(Long id);
    // void deleteCases(Long id);

}
