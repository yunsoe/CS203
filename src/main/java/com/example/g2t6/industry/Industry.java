package com.example.g2t6.industry;

import java.util.List;
import java.util.Set;
import java.util.HashSet;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
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

public class Industry {

    private  @Id @GeneratedValue (strategy = GenerationType.IDENTITY) Long id;
    @ManyToMany(mappedBy = "industryList")
    @JsonIgnore
    private Set <Company> companyList = new HashSet<>();

    @NotNull(message = "Industry name should not be null")
    private String name;

    public Industry(String name){
        this.name = name;
    }

}
