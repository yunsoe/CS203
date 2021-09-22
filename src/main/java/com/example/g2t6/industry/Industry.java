package com.example.g2t6.industry;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Company> companies;

    @NotNull(message = "Industry name cannot be empty")
    private String name;

    public Industry(String name){
        this.name = name;
    }

}
