package com.example.g2t6.news;

import java.util.*;

import org.springframework.stereotype.Service;
import com.example.g2t6.industry.*;

import java.time.*;

@Service
public class NewsServiceImpl implements NewsService{

    private NewsRepository newsRepo;
    private IndustryRepository industryRepo;

    public NewsServiceImpl(NewsRepository newsRepo, IndustryRepository industryRepo){
        this.newsRepo = newsRepo;
        this.industryRepo= industryRepo;
    }

    @Override
    public List<News> getAllNews() {
        return newsRepo.findAll();
    }

    // @Override
    // public List<News> getNewsByIndustry(Long id) {
    //     return industry.getNews();
    //     //return newsRepo.findByIndustry(industry);
    // }

    @Override
    public List<News> getNewsByCategory(String category) {
        return newsRepo.findByCategory(category);
    }

    @Override
    public List<News> getNewsByDate(LocalDate date) {
        return newsRepo.findByDate(date);
    }

    @Override
    public List<News> getNewsByIndustryAndCategory(Long id, String category) {
        Industry industry = industryRepo.findById(id).orElse(null);
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
    public News updateNews(News newsLatest) {
        return newsRepo.save(newsLatest);
        

    }

    @Override
    public void deleteNews(Long id) {
        newsRepo.deleteById(id);
    }
    
}
