package com.example.g2t6.news;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.*;
import java.time.*;


@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode

public class News {
    
    private @Id @GeneratedValue (strategy = GenerationType.IDENTITY) Long id;

    //@NotNull(message = "News should not be null");
    @Size(min = 5, message = "News should have a minimum of 5 characters")
    private String news;

    //@NotNull(message = "News should not be null");
    @Size(min = 3, max = 3, message = "Category should have a minimum of 3 characters")
    private String category; // REG or SOP

    private String industry;

    // @ManyToOne
    // @JoinColumn(name = "industry_id", nullable = false)
    // private Industry industry;

    private int casesQuarantined;
    private int casesHospCritical;
    private int casesHospNotCritical;
    private int deaths;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    @DateTimeFormat(pattern = "HH:mm:ss")
    private LocalTime time;

    public News(String news, String category, String industry, LocalDate date, LocalTime time) {
        this.news = news;
        this.category = category;
        this.industry = industry;
        this.date = date;
        this.time = time;
    }

    public News(int casesQuarantined, int casesHospCritical, int casesHospNotCritical, int deaths) {
        this.casesQuarantined = casesQuarantined;
        this.casesHospCritical = casesHospCritical;
        this.casesHospNotCritical = casesHospNotCritical;
        this.deaths = deaths;
    
    }

}
