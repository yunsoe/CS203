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
public class SwabTestDetail {

    private  @Id @GeneratedValue (strategy = GenerationType.IDENTITY) Long id;
    
    @ManyToOne
    @JoinColumn(name = "user", referencedColumnName = "email",nullable = false)
    private User user;

    @NotNull(message = "actual swab date cannot be null")
    private String startDate;

    private String period;
}
