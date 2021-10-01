package com.example.g2t6.company;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.example.g2t6.industry.Industry;

import lombok.*;


@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Company {
    private @Id @GeneratedValue (strategy = GenerationType.IDENTITY) Long id;
    
    @NotNull(message = "Company name should not be null")
    // null elements are considered valid, so we need a size constraints too
    @Size(min = 1, max = 200, message = "Comapny's name should be at least 5 characters long")
    private String name;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Industry> industryList;
    
    public Company(String name){
        this.name = name;
    }
}
