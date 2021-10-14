package com.example.g2t6.swabTest;
import java.time.LocalDate;

import javax.persistence.*;
import javax.validation.constraints.*;
import lombok.*;
import com.example.g2t6.user.*;
import java.time.LocalDate;
@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Table(name = "swabtest", schema = "cs203")
public class SwabTest {
    private  @Id @Column(name="swab_test_id") @GeneratedValue (strategy = GenerationType.IDENTITY) Long id;
   
    @ManyToOne
    @JoinColumn(name = "user_email", referencedColumnName = "user_email",nullable = false)
    private User user;

    @NotNull(message = "swabResult no cannot be null")
    @Column(name="swab_result")
    private boolean swabResult;

    @NotNull(message = "actual swab date cannot be null")
    @Column(name="actual_swab_date")
    private LocalDate actualSwabDate;

    public SwabTest(LocalDate actualSwabDate){ // use string for now but may change to LocalDate
        this.actualSwabDate = actualSwabDate;
    }

    
}
