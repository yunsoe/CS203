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
    @JoinColumn(name = "company_ID", nullable = false)
    private Company company;

    @NotNull(message = "Event Name should not be null")
    private String eventName;

    @NotNull(message = "Event Date should not be null")
    private String eventDate; 

    @NotNull(message = "Location should not be null")
    private String location;

}
