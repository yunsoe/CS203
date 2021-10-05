package com.example.g2t6;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.g2t6.swabTest.SwabTest;
import com.example.g2t6.swabTest.SwabTestRepository;
import com.example.g2t6.swabTest.SwabTestService;
import com.example.g2t6.swabTest.SwabTestServiceImpl;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class SwabServiceTest {
    @Mock 
    private SwabTestRepository swabTests;

    @InjectMocks
    private SwabTestServiceImpl swabService;

  

    // public static Date parseDate(String date) {
    //     try {
    //         return new SimpleDateFormat("yyyy-MM-dd").parse(date);
    //     } catch (ParseException e) {
    //         return null;
    //     }
    //  }

    @Test
    void addSwabTest_NewDate_ReturnSavedSwab(){
        // arrange
        SwabTest swabtest = new SwabTest("2020-08-01");
        //act
        when(swabTests.findByActualSwabDate(any(String.class))).thenReturn(new ArrayList<SwabTest>());
        when(swabTests.save(any(SwabTest.class))).thenReturn(swabtest);
        SwabTest savedSwab = swabService.addSwabHistory(swabtest);
        //assert
        assertNotNull(savedSwab);
        verify(swabTests).findByActualSwabDate(swabtest.getActualSwabDate());
        verify(swabTests).save(swabtest);
    }

    @Test
    void  addSwabTest_SameDate_ReturnNull(){
        SwabTest swabtest = new SwabTest("2020-08-01");
        List<SwabTest> swabs = new ArrayList<>();
        swabs.add(swabtest);
        when(swabTests.findByActualSwabDate(any(String.class))).thenReturn(swabs);
        SwabTest savedSwab = swabService.addSwabHistory(swabtest);
        assertNull(savedSwab);
        verify(swabTests).findByActualSwabDate(swabtest.getActualSwabDate());

    }

    @Test
    void updateSwabDate_NotFound_ReturnNull(){
        SwabTest swabtest = new SwabTest("2020-08-01");
        Long id = 10L;
        when(swabTests.findById(id)).thenReturn(Optional.empty());
        SwabTest updatedSwabTest = swabService.updateDate(id, swabtest);
        assertNull(updatedSwabTest);
        verify(swabTests).findById(id);
    }
}
