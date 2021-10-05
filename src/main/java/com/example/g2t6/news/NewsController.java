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

    
    // public NewsController (NewsService newsService) {
    //     this.newsService = newsService;
    // }

    @GetMapping("/news")
    public List<News> getNews(){
        return newsService.getAllNews();
    }

    @GetMapping("/news/industries/{id}") 
    public List<News> getNewsByIndustry(@PathVariable Long id) {     
        Industry industry = industryService.getIndustry(id);
        if (industry == null) {
            throw new IndustryNotFoundException(id);
        }

        List<News> newsByIndustry = industry.getNews();

        return newsByIndustry;
    }

    @GetMapping("/news/category/{category}") 
    public List<News> getNewsByCategory(@PathVariable String category) {

        return newsRepo.findByCategory(category);
    }

    @GetMapping("/news/date/{date}") 
    public List<News> getNewsByDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        return newsRepo.findByDate(date);
    }

    @GetMapping("/news/industry/{id}/category/{category}")
    public List<News> getNewsByIndustryAndCategory(@PathVariable Long id, @PathVariable String category) {
        Industry industry = industryService.getIndustry(id);
        if (industry == null) {
            throw new IndustryNotFoundException(id);
        }
        return newsRepo.findByIndustryIdAndCategory(id, category);
    }

    @GetMapping("/news/{id}")
    public Optional<News> getNewsById(Long id) {
        return newsService.getNewsById(id);
    }

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

    @PutMapping("/news/{id}")
    public News updateNews(@PathVariable Long id, @Valid @RequestBody News newsLatest){
        News news = newsRepo.findById(id).orElse(null);

        if (news == null) {
            throw new NewsNotFoundException(id);
        } 
        Industry industry = news.getIndustry();
        news = newsLatest;
        news.setIndustry(industry);
        return newsService.updateNews(newsLatest);
        
    }

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

