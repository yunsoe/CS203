package com.example.g2t6.news;

import java.util.*;

import org.springframework.context.annotation.Primary;

import java.time.*;

@Primary
public interface NewsService {
    
    List<News> getAllNews();
    // List<News> getNewsByIndustry(Long id);
    List<News> getNewsByDate(LocalDate date);
    List<News> getNewsByCategory(String category);
    List<News> getNewsByIndustryAndCategory(Long id, String category);
    Optional<News> getNewsById(Long id);

    News addNews(News news);
    News addNewsOnly(News news);
    News addCasesOnly(News cases);

    News updateNews(News newsLatest);
    // News updateCases(Long id, News casesLatest);

    void deleteNews(Long id);
    // void deleteCases(Long id);

}
