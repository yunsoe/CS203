package com.example.g2t6.user;

import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jdk.jshell.spi.ExecutionControl.UserException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.g2t6.company.*;
import com.example.g2t6.mail.*;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserRepository users;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private CompanyService companies;

    @Autowired
    private MailService mailService;

    /**
    * Gets a list of all the users
    * @return List of all users
    */
    @GetMapping("/users")
    public List<User> getUsers() {
        return users.findAll();
    }

    /**
    * Gets the company ID for a particular user
    * @param userEmail This is the email of the user whose company ID we want to retrieve
    * @exception UsernameNotFoundException User with this email was not found
    * @return This user's company ID
    */
    @GetMapping("/users/{userEmail}/company")
    public Long getUserCompanyId(@PathVariable String userEmail) {
        // checks if the email exists
        User user = users.findByEmail(userEmail).orElse(null);

        if (user == null) {
            throw new UsernameNotFoundException(userEmail);
        }
        
        return user.getCompany().getId();
    }

    /**
    * Gets list of users in a particular company
    * @param companyId This is the company ID that we want to retrieve the list of users for
    * @exception CompanyNotFoundException Company ID was not found
    * @return List of users in the company
    */
    @GetMapping("/users/{companyId}")
    public List<User> getUsersByCompanyId(@PathVariable Long companyId) {
        Company company = companies.getCompany(companyId);

        if(company == null) {
            throw new CompanyNotFoundException(companyId);
        }

        return company.getUsers();
    }
    
    /**
    * Adding a new user (employee) and using BCrypt encoder to encrypt the password for storage 
    * @param user User to be added
    * @param companyId The company ID of the user to be added
    * @exception CompanyNotFoundException Company ID was not found
    * @exception UserAlreadyExistsException User with the email specified already exists
    * @return The new user
    */
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/users/{companyId}")
    public User addUser(@Valid @RequestBody User user, @PathVariable Long companyId){
        user.setPassword(encoder.encode(user.getPassword()));
        Company company = companies.getCompany(companyId);

        if(company == null) {
            throw new CompanyNotFoundException(companyId);
        }

        User checkEmail = users.findByEmail(user.getEmail()).orElse(null);

        if (checkEmail != null) {
            throw new UserAlreadyExistsException(user.getEmail());
        }

        user.setCompany(company);
        return users.save(user);
    }

    /**
    * Adding a new user (admin) and using BCrypt encoder to encrypt the password for storage 
    * @param json A map that contains the information of the admin user to be added, including
    *             email, name, password, role, and company Id.
    * @exception UserAlreadyExistsException User with the email specified already exists
    * @return The new user
    */
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/users/admin/registration")
    public User addAdminUser(@RequestBody Map<String, String> json){
        Long companyId = Long.valueOf(json.get("companyId")).longValue();
        String email = json.get("email");
        String name = json.get("name");
        String password = json.get("password");
        String role = json.get("role");

        User user = users.findByEmail(email).orElse(null);

        if (user != null) {
            throw new UserAlreadyExistsException(email);
        }

        password = encoder.encode(password);

        User adminUser = new User(email, name, password, role, "ROLE_ADMIN");

        Company company = companies.getCompany(companyId);

        adminUser.setCompany(company);
        return users.save(adminUser);
    }

    /**
    * Checks if the user credentials are valid 
    * @param userEmail Email of the user to be validated
    * @param password Password of the user to be validated
    * @exception UsernameNotFoundException User with this email was not found, or password entered does not match the existing password
    * @return The user if the credentials are valid
    */
    @GetMapping("/users/login/{userEmail}/{password}")
    public User login(@PathVariable("userEmail") String userEmail, @PathVariable("password") String password) {
        // checks if the email exists
        User user = users.findByEmail(userEmail).orElse(null);

        if (user == null) {
            throw new UsernameNotFoundException(userEmail);
        }

        // checks if the password keyed in matches existing password
        if (!encoder.matches(password, user.getPassword())) {
            throw new UsernameNotFoundException(userEmail);
        }

        return user;
    }

    /**
    * To reset the password for the user with the email specified and send an email with the updated password
    * @param userEmail Email of the user whose password is to be resetted
    * @exception UsernameNotFoundException User with this email was not found
    * @return The user with the email specified
    */
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

    /**
    * To change the password for the user with the updated password specified and using BCrypt encoder to encrypt the password for storage 
    * @param userEmail Email of the user whose password is to be resetted
    * @param json A map with the current password and new password
    * @exception UsernameNotFoundException User with this email was not found
    * @exception UserIncorrectPasswordException Current password specified does not match the existing password
    * @return The user with the email specified
    */
    @PutMapping("users/{userEmail}/changePassword")
    public User changePassword(@PathVariable(value = "userEmail") String userEmail, @RequestBody Map<String, String> json) {
        String currentPassword = json.get("currentPassword");
        String newPassword = json.get("newPassword");

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

    /**
    * Delete a user from a company
    * @param companyId Company Id of user to be deleted
    * @param userEmail Email of user to be deleted
    * @exception CompanyNotFoundException Company was not found
    * @exception UsernameNotFoundException User with email specified was not found
    * @return ReponseEntity<>
    */
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