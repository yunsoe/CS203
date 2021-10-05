package com.example.g2t6.alert;

import javax.persistence.*;
import javax.validation.constraints.*;
import lombok.*;
import java.util.*;
import com.example.g2t6.user.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Alert {
    private  @Id @GeneratedValue (strategy = GenerationType.IDENTITY) Long id;
    @ManyToOne
    @JoinColumn(name = "userEmail", nullable = false)
    private User user;

    @NotNull(message = "Status cannot be null.")
    private boolean status;

    @NotNull(message = "Date cannot be null.")
    private Date alertDate;
    
    private String alert;

    public Alert(User user, boolean status, Date alertDate, String alert) {
        this.user = user;
        this.status = status;
        this.alertDate = alertDate;
        this.alert = alert;
    }

}
