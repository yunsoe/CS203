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
@Table(name = "alert", schema = "cs203")
public class Alert {
    private  @Id @Column(name="alert_id") @GeneratedValue (strategy = GenerationType.IDENTITY) Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_email", referencedColumnName = "user_email", nullable = false)
    private User user;

    //@NotNull(message = "Status cannot be null.")
    //private Boolean status;

    @NotNull(message = "Date cannot be null.")
    @Column(name="alert_date")
    private String alertDate;
    
    @NotNull(message = "Alert cannot be null.")
    @Column(name="alert")
    private String alert;

    public Alert(String alertDate, String alert) {
        //this.user = user;
        this.alertDate = alertDate;
        this.alert = alert;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User newUser) {
        user = newUser;
    }

    public String getAlertDate() {
        return alertDate;
    }

    public void setAlertDate(String newAlertDate) {
        alertDate = newAlertDate;
    }

    public String getAlert() {
        return alert;
    }

    public void setAlert(String newAlert) {
        alert = newAlert;
    }

}
