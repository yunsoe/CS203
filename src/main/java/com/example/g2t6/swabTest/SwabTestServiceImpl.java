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
        return swabTests.save(test);
    }

    @Override
    public SwabTest updateDate(Long id,Date date){
        return swabTests.findById(id).map(swabTest -> {swabTest.setActualSwabDate(date);
            return swabTests.save(swabTest);
        }).orElse(null);
    }

    @Override
    public List<SwabTest> listSwabHistoryByResulTestsAndDate(boolean swabResult,Date actualSwabDate){ // for admin to see that whose reult is positive
        return swabTests.findBySwabResult(swabResult);// how to set for a range from curr to that datae?
    }

}
