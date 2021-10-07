package com.example.g2t6.user;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.apache.commons.lang3.RandomStringUtils;

import com.example.g2t6.company.*;
import com.example.g2t6.mail.*;

@RestController
public class UserController {

    @Autowired
    private UserRepository users;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private CompanyService companies;

    @Autowired
    private MailService mailService;

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

    @PutMapping("users/{userEmail}/resetPassword")
    public User resetPassword(@PathVariable(value = "userEmail") String userEmail) {
        User user = users.findByEmail(userEmail).orElse(null);
        if (user == null) {
            throw new UsernameNotFoundException(userEmail);
        }
        String newRandomPassword = RandomStringUtils.random(10, true, true);
        Mail mail = new Mail(user.getEmail(), "Reset Password", "Your new password is " + newRandomPassword + ". Please log in using the new password and change your password");
        //for testing purposes
        //Mail mail = new Mail("zxnlee00@gmail.com", "Reset Password", "Your new password is " + newRandomPassword + ". Please log in using the new password and change your password.");
        mailService.sendMail(mail);

        user.setPassword(encoder.encode(newRandomPassword));
        users.save(user);
        
        return user;
    }

    @PutMapping("users/{companyId}/{userEmail}/changePassword")
    public User changePassword(@PathVariable(value = "companyId") Long companyId, @PathVariable(value = "userEmail") String userEmail, @RequestBody Map<String, String> json) {
        String currentPassword = json.get("currentPassword");
        String newPassword = json.get("newPassword");

        if(companies.getCompany(companyId) == null) {
            throw new CompanyNotFoundException(companyId);
        }

        User user = users.findByEmail(userEmail).orElse(null);
        if (user == null) {
            throw new UsernameNotFoundException(userEmail);
        }

        if (!encoder.matches(currentPassword, user.getPassword())) {
            throw new UserIncorrectPasswordException(userEmail);
        }

        Mail mail = new Mail(user.getEmail(), "Change Password", "You have successfully changed your password.");
        //for testing purposes
        //Mail mail = new Mail("zxnlee00@gmail.com", "Change Password", "You have successfully changed your password.");
        mailService.sendMail(mail);

        user.setPassword(encoder.encode(newPassword));
        users.save(user);
        
        return user;
    }

    @DeleteMapping("/users/{companyId}/{userEmail}")
    public ResponseEntity<?> deleteUser(@PathVariable (value = "companyId") Long companyId, @PathVariable (value = "userEmail") String userEmail) {
        if(companies.getCompany(companyId) == null) {
            throw new CompanyNotFoundException(companyId);
        }
        
        return users.findByEmail(userEmail).map(user -> {
            users.delete(user);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new UsernameNotFoundException(userEmail));
    }
}