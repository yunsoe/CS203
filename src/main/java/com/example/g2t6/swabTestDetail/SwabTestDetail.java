package com.example.g2t6.swabTestDetail;
import javax.persistence.*;
import javax.validation.constraints.*;
import lombok.*;
import com.example.g2t6.user.*;
@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Table(name = "swab_test_detail", schema = "cs203")
public class SwabTestDetail {

    private  @Id @Column(name="swab_test_detail_id") @GeneratedValue (strategy = GenerationType.IDENTITY) Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_email", referencedColumnName = "user_email", nullable = false)
    private User user;

    @NotNull(message = "actual swab date cannot be null")
    @Column(name="start_date")
    private String startDate;

    //@NotNull(message = "Alert day (of the week) cannot be null")
    //private String sendAlertTime = "* 0/1 * ? * *";

    @Column(name="AlertDay")
    private String AlertDay; // MON-FRI, give options

    @Column(name="AlertTime")
    private String AlertTime; // format --> HH:MM
}
