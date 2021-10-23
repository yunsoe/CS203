package com.example.g2t6.swabTestDetail;
import java.util.List;

import javax.validation.Valid;
import com.example.g2t6.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;


@RestController
@CrossOrigin
public class SwabTestDetailController {

    private UserRepository users;
    private SwabTestDetailRepository swabTestDetails;

    public SwabTestDetailController(SwabTestDetailRepository swabTestDetails){
        this.swabTestDetails = swabTestDetails;
    }

    @GetMapping("swabTestDetails/{userId}")
    public List<SwabTestDetail> getAllSwabDetails(@PathVariable (value = "userId") String userId){
        return swabTestDetails.findByuserEmail(userId);
    }

    @PostMapping("swabTestDetails/{userEmail}")
    public SwabTestDetail addswabTestDetail(@PathVariable (value = "userEmail")String userEmail,SwabTestDetail newSwabTestDetail){
        return users.findByEmail(userEmail).map(user ->{
            newSwabTestDetail.setUser(user);
            return swabTestDetails.save(newSwabTestDetail);
        }).orElseThrow(() -> new UsernameNotFoundException(userEmail));
        
    }

    @PutMapping("users/{userEmail}/swabTestDetails/{swabId}")
    public SwabTestDetail updateSwabTestDetail(@PathVariable (value = "userEamil")String userEmail,@PathVariable (value = "swabId")Long id,@Valid @RequestBody SwabTestDetail newSwabTestDetail){
        return swabTestDetails.findByIdAndUserEmail(id,userEmail).map(swabTestDetail -> {
            swabTestDetail.setAlertDay(newSwabTestDetail.getAlertDay());
            swabTestDetail.setAlertTime(newSwabTestDetail.getAlertDay());
            swabTestDetail.setMessage(newSwabTestDetail.getMessage());
            return swabTestDetails.save(swabTestDetail);
        }).orElseThrow(() -> new SwabTestDetailNotFoundException(id));

    }

    @DeleteMapping("users/{userEmail}/swabTestDetails/{swabId}")
    public ResponseEntity<?> deleteSwabTestDetial(@PathVariable (value = "swabId") Long id,
                              @PathVariable (value = "userEmail") String userEmail) {

        return swabTestDetails.findByIdAndUserEmail(id,userEmail).map(swabTestDetail -> {
            swabTestDetails.delete(swabTestDetail);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new SwabTestDetailNotFoundException(id));
    }

}
