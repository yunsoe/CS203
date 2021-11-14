package com.example.g2t6.news;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import java.time.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.example.g2t6.industry.*;

@RestController
public class NewsController {

    @Autowired
    private NewsService newsService;

    @Autowired
    private IndustryService industryService;

    @Autowired
    private NewsRepository newsRepo;

    /**
    * Gets all news articles
    * @return A list of all news articles in the database
    */

    @GetMapping("/news")
    public List<News> getNews(){
        return newsService.getAllNews();
    }

    /**
    * Gets all news articles in a specified industry
    * @param id The id of the industry
    * @return A list of all news articles in the industry specified in the method
    */

    @GetMapping("/news/industries/{id}") 
    public List<News> getNewsByIndustry(@PathVariable Long id) {     
        Industry industry = industryService.getIndustry(id);
        if (industry == null) {
            throw new IndustryNotFoundException(id);
        }

        List<News> newsByIndustry = industry.getNews();

        return newsByIndustry;
    }

    /**
    * Gets all news articles in a specified category
    * @param category The category of the news article
    * @return A list of all news articles in the category specified in the method
    */

    @GetMapping("/news/category/{category}") 
    public List<News> getNewsByCategory(@PathVariable String category) {

        return newsRepo.findByCategory(category);
    }

    /**
    * Gets all news articles on a specified date
    * @param date The date of the news article
    * @return A list of all news articles published on the date specified in the method
    */

    @GetMapping("/news/date/{date}") 
    public List<News> getNewsByDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        return newsRepo.findByDate(date);
    }

    /**
    * Gets all news articles in a specified industry and category
    * @param id The id of the industry
    * @param category The category of the news article
    * @return A list of all news articles in the industry and category specified in the method
    */

    @GetMapping("/news/industry/{id}/category/{category}")
    public List<News> getNewsByIndustryAndCategory(@PathVariable Long id, @PathVariable String category) {
        Industry industry = industryService.getIndustry(id);
        if (industry == null) {
            throw new IndustryNotFoundException(id);
        }
        return newsRepo.findByIndustryIdAndCategory(id, category);
    }

    /**
    * Gets a specific news article 
    * @param id The id of the news article
    * @return The news article specified in the method
    */

    @GetMapping("/news/{id}")
    public Optional<News> getNewsById(Long id) {
        return newsService.getNewsById(id);
    }

    /**
    * Posts a new news article 
    * @param id The id of the industry
    * @param news The new news article, containing all details
    * @return Response status 201 when successfully created
    */

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/news/{id}")
    public News addNews(@PathVariable Long id, @Valid @RequestBody News news) {
        Industry industry = industryService.getIndustry(id);
        if (industry == null) {
            throw new IndustryNotFoundException(id);
        }
        news.setIndustry(industry);
        return newsService.addNews(news);
    }

    /**
    * Posts a new news article 
    * @param id The id of the industry
    * @param news The new news article, containing details of number of cases/deaths only
    * @return Response status 201 when successfully created
    */

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/news/cases/{id}")
    public News addCasesOnly(@PathVariable Long id, @Valid @RequestBody News cases) {
        Industry industry = industryService.getIndustry(id);
        if (industry == null) {
            throw new IndustryNotFoundException(id);
        }
        cases.setIndustry(industry);
        return newsService.addCasesOnly(cases);
    }

    /**
    * Posts a new news article 
    * @param id The id of the industry
    * @param news The new news article, containing details of the news, excluding number of cases/deaths
    * @return Response status 201 when successfully created
    */

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/newsOnly/{id}")
    public News addNewsOnly(@PathVariable Long id, @Valid @RequestBody News newsOnly) {
        Industry industry = industryService.getIndustry(id);
        if (industry == null) {
            throw new IndustryNotFoundException(id);
        }
        newsOnly.setIndustry(industry);
        return newsService.addNewsOnly(newsOnly);
    }

    /**
    * Updates an existing news article 
    * @param id The id of the existing news article
    * @param newsLatest New details of the new article
    * @return Saves new changes made to news article
    */

    @PutMapping("/news/{id}")
    public News updateNews(@PathVariable Long id, @Valid @RequestBody News newsLatest){
        News news = newsRepo.findById(id).orElse(null);

        if (news == null) {
            throw new NewsNotFoundException(id);
        } 
        Industry industry = news.getIndustry();
        news = newsLatest;
        news.setIndustry(industry);
        return newsService.updateNews(news);
        
    }

    /**
    * Deletes an existing news article 
    * @param id The id of the existing news article
    * @return Deletes the news article specified in the method
    */

    @DeleteMapping("/news/{id}")
    public void deleteNews(@PathVariable Long id){
        //newsService.deleteNews(id);
        try {
            newsService.deleteNews(id);
        } catch(EmptyResultDataAccessException e) {
            throw new NewsNotFoundException(id);
        }
    }

    
}

