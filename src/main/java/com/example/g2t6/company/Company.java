package com.example.g2t6.company;

import java.util.List;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.example.g2t6.industry.Industry;
import com.example.g2t6.event.Event;
import com.example.g2t6.user.User;


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
    private List<Event> eventList;

    @ManyToMany
    @JoinTable(
        name = "company_industries", 
        joinColumns = @JoinColumn(name = "company_id"), 
        inverseJoinColumns = @JoinColumn(name = "industry_id"))     
    @JsonIgnore
    private Set<Industry> industries = new HashSet<> ();

    @ManyToOne
    @JoinColumn(name = "user", referencedColumnName = "email", nullable = false)
    private User user;
    
    public Company(String name){
        this.name = name;
    }
}
