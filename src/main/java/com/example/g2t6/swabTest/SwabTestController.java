package com.example.g2t6.swabTest;
import java.util.List;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import javax.validation.Valid;
import com.example.g2t6.user.User;
import com.example.g2t6.user.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;


@RestController
public class SwabTestController {

    @Autowired
    private SwabTestService swabTestService;

    @Autowired
    private UserRepository userRepository;
    // public SwabTestController(SwabTestService s, UserRepository userRepository){
    //     this.swabTestService = s;
    //     this.userRepository = userRepository;
    // }
    @Autowired
    private SwabTestRepository swabTests;

    @GetMapping("/swabTests/{userId}")  // this is for admin to see only, how to differenttiate it from the users' seeing their own result
    public List<SwabTest> getSwabTests(@PathVariable (value = "userId")String userId){
        return swabTestService.listSwabHistory(userId); // need to throw user not found exceptions
    }

    @GetMapping("/swabTests/{swabResult}/{actualSwabDate}")
    public List<SwabTest> getSpecificSwabTests(@Valid @PathVariable boolean swabResult,@Valid @PathVariable String actualSwabDate){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(actualSwabDate, formatter);
        return swabTestService.listSwabHistoryByResulTestsAndDate(swabResult, date);
    }

    @GetMapping("/swabTests/{sDate}/date/{eDate}")
    public List<SwabTest> getRangeOfSwabTestByDate(@Valid @PathVariable String sDate, @Valid @PathVariable String eDate){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate startDate = LocalDate.parse(sDate, formatter);
        LocalDate endDate = LocalDate.parse(eDate, formatter);
        return swabTests.findByActualSwabDateBetween(startDate, endDate);


    }


    @GetMapping("/users/{userEmail}/swabTests")
    public List<SwabTest> getIndividuSwabTests(@PathVariable (value = "userEmail") String userEmail){
        return swabTestService.listSwabHistory(userEmail);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/users/{userEmail}/swabTests")
    public SwabTest addSwabTest(@PathVariable (value = "userEmail") String userEmail,@Valid @RequestBody SwabTest swabTest){
        return userRepository.findByEmail(userEmail).map(user ->{
            swabTest.setUser(user);
          SwabTest savedSwabTest = swabTestService.addSwabHistory(swabTest);
        if (savedSwabTest ==  null) throw new SwabTestExistsException(swabTest.getActualSwabDate());
        return savedSwabTest;
        }).orElseThrow(() -> new UsernameNotFoundException(userEmail));
      
    }

    @PutMapping("/users/{userEmail}/swabTests/{swabId}")
    public SwabTest updateSwabTest(@PathVariable(value = "userEmail") String userEmail,
                                    @PathVariable(value = "swabId") Long swabId,
                                    @Valid @RequestBody SwabTest newSwabTest){

        return swabTests.findByIdAndUserEmail(swabId, userEmail).map(swabTest -> {
            return swabTestService.updateDate(swabId, newSwabTest);
            
        }).orElseThrow(() -> new SwabTestNotFoundException(swabId));

        // SwabTest swabTest = swabTestService.updateDate(swabId, newSwabTest);
        // if(swabTest == null) throw new SwabTestNotFoundException(swabId);
        // return swabTest;
    }

}
