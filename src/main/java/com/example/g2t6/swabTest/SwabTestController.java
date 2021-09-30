package com.example.g2t6.swabTest;
import java.util.List;
import java.util.Date;
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

    @GetMapping("/swabTests")
    public List<SwabTest> getSpecificSwabTests(@Valid @RequestBody boolean swabResult,@Valid @RequestBody Date actualSwabDate){
        return swabTestService.listSwabHistoryByResulTestsAndDate(swabResult, actualSwabDate);
    }

    @GetMapping("/users/{userEmail}/swabTests")
    public List<SwabTest> getIndividuSwabTests(@PathVariable (value = "userEmail") String userEmail){
        return swabTestService.listSwabHistory(userEmail);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/users/{userEmail}/swabTests")
    public SwabTest addSwabTest(@Valid @RequestBody SwabTest swabTest){
        SwabTest savedSwabTest = swabTestService.addSwabHistory(swabTest);
        //if (savedSwabTest ==  null) throw new SwabExistsException(swabTest.getDate());
        return savedSwabTest;
    }

    @PutMapping("/users/{userEmail}/swabTests/{swabId}")
    public SwabTest updateSwabTest(@PathVariable(value = "userEmail") String userEmail,
                                    @PathVariable(value = "swabId") Long swabId,
                                    @Valid @RequestBody SwabTest newSwabTest){
        SwabTest swabTest = swabTestService.updateDate(swabId, newSwabTest);
        //if(swabTest2 == null) throw new SwabTestNotFoundException(swabId);
        return swabTest;
    }

}
