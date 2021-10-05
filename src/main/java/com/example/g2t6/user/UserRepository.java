package com.example.g2t6.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> { // string cuz the id for a user is its email which is a string
    // define a derived query to find user by email
    Optional<User> findByEmail(String email);
}