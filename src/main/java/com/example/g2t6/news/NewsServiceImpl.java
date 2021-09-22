package com.example.g2t6.News;

import java.util.*;

import org.springframework.stereotype.Service;

import java.time.*;

@Service
public class NewsServiceImpl implements NewsService{

    private NewsRepository newsRepo;

    public NewsServiceImpl(NewsRepository newsRepo){
        this.newsRepo = newsRepo;
    }

    @Override
    public List<News> getAllNews() {
        return newsRepo.findAll();
    }

    @Override
    public List<News> getNewsByIndustry(String industry) {
        return newsRepo.findByIndustry(industry);
    }

    @Override
    public List<News> getNewsByCategory(String category) {
        return newsRepo.findByCategory(category);
    }

    @Override
    public List<News> getNewsByDate(LocalDate date) {
        return newsRepo.findByDate(date);
    }

    @Override
    public List<News> getNewsByIndustryAndCategory(String industry, String category) {
        return newsRepo.findByIndustryAndCategory(industry, category);
    }

    @Override
    public Optional<News> getNewsById(Long id) {
        return newsRepo.findById(id);
    }

    @Override
    public News addNews(News news) {
        return newsRepo.save(news);
    }

    @Override
    public News addNewsOnly(News newsOnly) {
        return newsRepo.save(newsOnly);
    }

    @Override
    public News addCasesOnly(News cases) {
        return newsRepo.save(cases);
    }

    @Override
    public News updateNews(Long id, News newsLatest) {
        
        News news = newsRepo.findById(id).orElse(null);

        if (news == null) {
            return null;
        } else {
            news.setNews(newsLatest.getNews());
            news.setDate(newsLatest.getDate());
            news.setTime(newsLatest.getTime());
            news.setCasesQuarantined(newsLatest.getCasesQuarantined());
            news.setCasesHospCritical(newsLatest.getCasesHospCritical());
            news.setCasesHospNotCritical(newsLatest.getCasesHospNotCritical());
            news.setDeaths(newsLatest.getDeaths());
        }
        
        newsRepo.save(news);
        return news;

    }

    @Override
    public void deleteNews(Long id) {
        newsRepo.deleteById(id);
    }
    
}
