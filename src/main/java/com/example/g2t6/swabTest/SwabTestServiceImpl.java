package com.example.g2t6.swabTest;
import java.util.List;
import java.util.Date;
import org.springframework.stereotype.Service;
@Service
public class SwabTestServiceImpl implements SwabTestService{
    private SwabTestRepository swabTests;

    public SwabTestServiceImpl(SwabTestRepository swabTest){
        this.swabTests = swabTest;
    }
    @Override
    public List<SwabTest> listSwabHistory(String userEmail){
        return swabTests.findByUserEmail(userEmail);
    }

    @Override
    public SwabTest addSwabHistory(SwabTest test){
        List<SwabTest> sameDate = swabTests.findByActualSwabDate(test.getActualSwabDate());
        if(sameDate.size() == 0){
            return swabTests.save(test);
        }
        return null;
    }

    @Override
    public SwabTest updateDate(Long id,SwabTest newSwabTest){
        return swabTests.findById(id).map(swabTest -> {swabTest.setActualSwabDate(newSwabTest.getActualSwabDate());
            return swabTests.save(swabTest);
        }).orElse(null);
    }

    @Override
    public List<SwabTest> listSwabHistoryByResulTestsAndDate(boolean swabResult,String actualSwabDate){ // for admin to see that whose reult is positive
        return swabTests.findBySwabResultAndDate(swabResult, actualSwabDate);// how to set for a range from curr to that datae?
    }

}
