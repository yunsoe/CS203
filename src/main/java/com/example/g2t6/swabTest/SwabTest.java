package com.example.g2t6.swabTest;
import javax.persistence.*;
import javax.validation.constraints.*;
import lombok.*;
import com.example.g2t6.user.*;
import java.util.Date;
@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class SwabTest {
    private  @Id @GeneratedValue (strategy = GenerationType.IDENTITY) Long id;
    @ManyToOne
    @JoinColumn(name = "user", referencedColumnName = "email",nullable = false)
    private User user;

    @NotNull(message = "swabResult no cannot be null")
    private boolean swabResult;

    @NotNull(message = "actual swab date cannot be null")
    private Date actualSwabDate;

}
