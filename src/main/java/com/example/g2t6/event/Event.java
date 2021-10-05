package com.example.g2t6.event;

import com.example.g2t6.company.*;
import javax.persistence.*;
import javax.validation.constraints.*;
import com.example.g2t6.user.*;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode

public class Event {

    private @Id @GeneratedValue (strategy = GenerationType.IDENTITY) Long id;
    
    @ManyToOne
    @JoinColumn(name = "company_ID", nullable = false)
    @JsonIgnore
    private Company company;

    @ManyToMany(mappedBy = "events")
    private Set<User> users = new HashSet<>();

    @NotNull(message = "Event Name should not be null")
    private String event;

    @NotNull(message = "Event Date should not be null")
    private String eventDate; 

    @NotNull(message = "Location should not be null")
    private String location;

}
