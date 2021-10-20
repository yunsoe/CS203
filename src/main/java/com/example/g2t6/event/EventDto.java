package com.example.g2t6.event;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

import lombok.*;

// @Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
// @Table(name = "user_events", schema = "cs203")
public class EventDto {

    // private @Id @GeneratedValue (strategy = GenerationType.IDENTITY) Long id;
    private long id;
    private String name;
    private Set<String> users = new HashSet<>();
    
}
