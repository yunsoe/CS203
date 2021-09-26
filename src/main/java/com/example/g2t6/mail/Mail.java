package com.example.g2t6.mail;

import javax.persistence.*;
import javax.validation.constraints.*;

import lombok.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Mail {

    private @Id @GeneratedValue (strategy = GenerationType.IDENTITY) Long id;

    @Email
    @NotNull(message = "Recipient should not be null")
    private String recipient;

    @NotNull(message = "Subject should not be null")
    private String subject;

    @NotNull(message = "Message should not be null")
    private String message;

    public Mail (String recipient, String subject, String message) {
        this.recipient = recipient;
        this.subject = subject;
        this.message = message;
    }
}