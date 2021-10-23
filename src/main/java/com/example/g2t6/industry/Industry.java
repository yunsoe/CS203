package com.example.g2t6.industry;

import java.util.List;
import java.util.Set;
import java.util.HashSet;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.example.g2t6.news.News;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.validation.constraints.NotNull;


import com.example.g2t6.company.Company;

import lombok.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Table(name="industry", schema = "cs203")
public class Industry {

    private  @Id @Column(name="industry_id") @GeneratedValue (strategy = GenerationType.IDENTITY) Long id;
    
    @OneToMany (mappedBy = "industry", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Company> companies;

    
    @NotNull(message = "Industry name should not be null") 
    @Column(name="name")
    private String name;

    // @OneToMany(mappedBy = "industry", cascade = CascadeType.ALL, orphanRemoval = true)
    // private List<News> news;

    public Industry(String name){
        this.name = name;
    }

}
