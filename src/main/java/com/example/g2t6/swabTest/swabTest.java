package com.example.g2t6.swabTest;
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
public class SwabTest {
    private  @Id @GeneratedValue (strategy = GenerationType.IDENTITY) Long id;
    @ManyToOne
    @JoinColumn(name = "userEmail",nullable = false);
    private User user;

    @NotNull(message = "expected swab date cannot be null")
    private String expectedswabDate;// should this be stored in user // there is like a swab test history and a swab test subscription 

    @NotNull(message = "swabResult no cannot be null")
    private String swabResult;

    @NotNull(message = "actual swab date no cannot be null")
    private String actualSwabDate;

}
