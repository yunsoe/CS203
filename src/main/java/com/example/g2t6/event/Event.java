package com.example.g2t6.event;

import com.example.g2t6.company.*;
import javax.persistence.*;
import javax.validation.constraints.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

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
    @JoinColumn(name = "companyID",nullable = false);
    private Company company;

    @NotNull(message = "Event Name cannot be empty")
    private String eventName;

    @NotNull(message = "Event Date cannot be empty")
    private String eventDate; 

    @NotNull(message = "Location cannot be empty")
    private String location;

}
