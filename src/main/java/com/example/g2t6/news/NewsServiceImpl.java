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

    /**
    * Gets all news articles
    * @return A list of all news articles in the database
    */

    @Override
    public List<News> getAllNews() {
        return newsRepo.findAll();
    }

    /**
    * Gets all news articles in a specified category
    * @param category The category of the news article
    * @return A list of all news articles in the category specified in the method
    */

    @Override
    public List<News> getNewsByCategory(String category) {
        return newsRepo.findByCategory(category);
    }

    /**
    * Gets all news articles on a specified date
    * @param date The date of the news article
    * @return A list of all news articles published on the date specified in the method
    */

    @Override
    public List<News> getNewsByDate(LocalDate date) {
        return newsRepo.findByDate(date);
    }

    /**
    * Gets all news articles in a specified industry and category
    * @param id The id of the industry
    * @param category The category of the news article
    * @return A list of all news articles in the industry and category specified in the method
    */

    @Override
    public List<News> getNewsByIndustryAndCategory(Long id, String category) {
        Industry industry = industryRepo.findById(id).orElse(null);
        return newsRepo.findByIndustryIdAndCategory(id, category);
    }

    /**
    * Gets a specific news article 
    * @param id The id of the news article
    * @return The news article specified in the method
    */

    @Override
    public Optional<News> getNewsById(Long id) {
        return newsRepo.findById(id);
    }

    /**
    * Posts a new news article 
    * @param news The new news article, containing all details
    * @return Saves new article into the database
    */

    @Override
    public News addNews(News news) {
        return newsRepo.save(news);
    }

    /**
    * Posts a new news article 
    * @param news The new news article, containing details of the news, excluding number of cases/deaths
    * @return Saves new article into the database
    */

    @Override
    public News addNewsOnly(News newsOnly) {
        return newsRepo.save(newsOnly);
    }

    /**
    * Posts a new news article 
    * @param news The new news article, containing details of number of cases/deaths only
    * @return Saves new article into the database
    */

    @Override
    public News addCasesOnly(News cases) {
        return newsRepo.save(cases);
    }

    /**
    * Updates an existing news article 
    * @param newsLatest New details of the new article
    * @return Saves new changes made to news article
    */

    @Override
    public News updateNews(News newsLatest) {
        return newsRepo.save(newsLatest);
    }

    /**
    * Deletes an existing news article 
    * @param id The id of the existing news article
    * @return Deletes the news article specified in the method
    */

    @Override
    public void deleteNews(Long id) {
        newsRepo.deleteById(id);
    }
    
}
