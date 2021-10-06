package com.example.g2t6.user;

import java.util.List;

import javax.validation.Valid;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.example.g2t6.company.*;

@RestController
public class UserController {

    @Autowired
    private UserRepository users;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private CompanyService companies;

    // public UserController(UserRepository users, BCryptPasswordEncoder encoder, CompanyService companies){
    //     this.users = users;
    //     this.encoder = encoder;
    //     this.companies = companies;
    // }

    @GetMapping("/users")
    public List<User> getUsers() {
        return users.findAll();
    }

    @GetMapping("/users/{companyId}")
    public List<User> getUsersByCompanyId(@PathVariable Long companyId) {
        Company company = companies.getCompany(companyId);

        if(company == null) {
            throw new CompanyNotFoundException(companyId);
        }

        return company.getUsers();
    }

    /**
    * Using BCrypt encoder to encrypt the password for storage 
    * @param user
     * @return
     */
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/users/{companyId}")
    public User addUser(@Valid @RequestBody User user, @PathVariable Long companyId){
        user.setPassword(encoder.encode(user.getPassword()));
        Company company = companies.getCompany(companyId);

        if(company == null) {
            throw new CompanyNotFoundException(companyId);
        }

        user.setCompany(company);
        return users.save(user);
    }
}