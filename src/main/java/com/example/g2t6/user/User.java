package com.example.g2t6.user;

import java.util.List;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.example.g2t6.feedback.Feedback;
import com.example.g2t6.swabTest.SwabTest;
import com.example.g2t6.swabTestDetail.SwabTestDetail;
import com.example.g2t6.company.Company;
import com.example.g2t6.alert.Alert;
import com.example.g2t6.event.Event;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class User implements UserDetails {
    
    private static final long serialVersionUID = 1L;

    @Email
    @NotNull(message = "Email should not be null")
    private @Id String email;
        
    @NotNull(message = "Name should not be null")
    @Size(min = 5, max = 30, message = "Name should be between 5 and 20 characters")
    private String name;
        
    @NotNull(message = "Password should not be null")
    @Size(min = 8, message = "Password should be at least 8 characters")
    private String password;

    @ManyToOne //composition, since we cant have a user without a company, in company class there should be orphanRemoval = true (refer to week 4 slide 17)
    @JoinColumn(name = "company_id", nullable = false) //may need to be update depending on company class impl
    @JsonIgnore
    private Company company;

    @ManyToMany
    @JoinTable(name="user_events",
        joinColumns = 
            @JoinColumn(name="user_email"),
        inverseJoinColumns = 
        @JoinColumn(name="event_id"))
    @JsonIgnore
    private Set<Event> events = new HashSet<>();

    @OneToMany (mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<SwabTest> swabTests;

    @OneToMany (mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<SwabTestDetail> swabTestDetail;

    @NotNull(message = "Role should not be null")
    @Size(min = 2, max = 30, message = "Role should be between 2 and 30 characters")
    private String role;

    @OneToMany (mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Feedback> feedbacks;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Alert> alerts;

    @NotNull(message = "Authorities should not be null")
    // We define two roles/authorities: ROLE_USER or ROLE_ADMIN
    private String authorities;

    public User(String email, String name, String password, String role, String authorities){
        this.email = email;
        this.name = name;
        this.password = password;
        this.role = role;
        this.authorities = authorities;
    }

    /* Return a collection of authorities (roles) granted to the user.
    */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(new SimpleGrantedAuthority(authorities));
    }

    /*
    The various is___Expired() methods return a boolean to indicate whether
    or not the user’s account is enabled or expired.
    */
    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }
    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }
    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return true;
    }

    // need to override because we using email, not username
    @Override
    @JsonIgnore
    public String getUsername() {
        return email;
    }
}
