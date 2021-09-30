package com.example.g2t6.swabTest;
import java.util.List;

import javax.validation.Valid;


import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class SwabTestController {
    private SwabTestService swabTestService;
    public SwabTestController(SwabTestService s){
        this.swabTestService = s;
    }

    @GetMapping("/swabTests/{userId}")  // this is for admin to see only, how to differenttiate it from the users' seeing their own result
    public List<SwabTest> getSwabTests(@PathVariable (value = "userId")String userId){
        return swabTestService.listSwabHistory(userId); // need to throw user not found exceptions
    }

    @GetMapping("/users/{userEmail}/swabTests")
    public List<SwabTest> getIndividuSwabTests(@PathVariable (value = "userEmail") String userEmail){
        return swabTestService.listSwabHistory(userEmail);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/users/{userEmail}/swabTests")
    public SwabTest addSwabTest(@Valid @RequestBody SwabTest swabTest){
        SwabTest savedSwabTest = swabTestService.addSwabHistory(swabTest);
        //if (savedBook ==  null) throw new SwabExistsException(swabTest.getDate());
        return savedSwabTest;
    }

}
