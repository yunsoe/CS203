package com.example.g2t6.news;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import com.example.g2t6.industry.Industry;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "news", schema = "cs203")
public class News {
    
    private @Id @Column(name="news_id") @GeneratedValue (strategy = GenerationType.IDENTITY) Long id;

    //@NotNull(message = "News should not be null");
    // @Size(min = 5, message = "News should have a minimum of 5 characters")
    // @Column(name="news")
    // private String news;

    @Column(name="title")
    private String title;

    @Column(name="image")
    private String image;

    @Column(name="link")
    private String link;

    //@NotNull(message = "News should not be null");
    @Size(min = 3, max = 3, message = "Category should have a minimum of 3 characters")
    @Column(name="category")
    private String category; // REG or SOP

    //private String industry;

    @ManyToOne
    @JoinColumn(name = "industry_id", referencedColumnName = "industry_id", nullable = false)
    @JsonIgnore
    private Industry industry;

    @Column(name="cases_quarantined")
    private int casesQuarantined;

    @Column(name="cases_hosp_critical")
    private int casesHospCritical;

    @Column(name="cases_hosp_not_critical")
    private int casesHospNotCritical;

    @Column(name="deaths")
    private int deaths;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name="date")
    private LocalDate date;

    @DateTimeFormat(pattern = "HH:mm:ss")
    @Column(name="time")
    private LocalTime time;

    public News(String title, String link, String image, String category, LocalDate date, LocalTime time) {
        this.title = title;
        this.link = link;
        this.image = image;
        this.category = category;
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
