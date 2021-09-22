package com.example.g2t6.feedback;

import javax.annotation.processing.Generated;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.example.g2t6.user.User;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Feedback {
    private @Id @GeneratedValue (strategy = GenerationType.IDENTITY) Long id;

    @NotNull(message = "Feedback title should not be null")
    @Size(min = 2, max = 30, message = "Feedback title should be at least 2 characters long and less than 30 characters.")
    private String title;

    @NotNull(message = "Feedback details should not be null")
    @Size(min = 10, max = 200, message = "Feedback details should be at least 10 characters long and less than 200 characters.")
    private String details;

    @ManyToOne
    @JoinColumn(name = "user", referencedColumnName = "email", nullable = false)
    private User user;
}
