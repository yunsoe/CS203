package com.example.g2t6.news;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;
import java.time.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
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

@RestController
public class NewsController {

    @Autowired
    private NewsService newsService;

    
    // public NewsController (NewsService newsService) {
    //     this.newsService = newsService;
    // }

    @GetMapping("/news")
    public List<News> getNews(){
        return newsService.getAllNews();
    }

    @GetMapping("/news/{industry}") 
    public List<News> getNewsByIndustry(@PathVariable String industry) {
        return newsService.getNewsByIndustry(industry);
    }

    @GetMapping("/news/{category}") 
    public List<News> getNewsByCategory(@PathVariable String category) {
        return newsService.getNewsByCategory(category);
    }

    @GetMapping("/news/{date}") 
    public List<News> getNewsByDate(@PathVariable LocalDate date) {
        return newsService.getNewsByDate(date);
    }

    @GetMapping("/news/{industry}/{category}")
    public List<News> getNewsByIndustryAndCategory(String industry, String category) {
        return newsService.getNewsByIndustryAndCategory(industry, category);
    }

    @GetMapping("/news/{id}")
    public Optional<News> getNewsById(Long id) {
        return newsService.getNewsById(id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/news")
    public News addNews(@Valid @RequestBody News news) {
        return newsService.addNews(news);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/news/cases")
    public News addCasesOnly(@Valid @RequestBody News cases) {
        return newsService.addCasesOnly(cases);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/newsOnly")
    public News addNewsOnly(@Valid @RequestBody News newsOnly) {
        return newsService.addNewsOnly(newsOnly);
    }

    @PutMapping("/news/{id}")
    public News updateNews(@PathVariable Long id, @Valid @RequestBody News newsLatest){
        News news = newsService.updateNews(id, newsLatest);
        //if(news == null) throw new NewsNotFoundException(id);
        
        return news;
    }

    @DeleteMapping("/news/{id}")
    public void deleteNews(@PathVariable Long id){
        newsService.deleteNews(id);
        // try {
        //     newsService.deleteNews(id);
        // } catch(EmptyResultDataAccessException e) {
        //     throw new BookNotFoundException(id);
        // }
    }

    
}

