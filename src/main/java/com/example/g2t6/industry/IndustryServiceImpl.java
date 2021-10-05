package com.example.g2t6.industry;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class IndustryServiceImpl implements IndustryService {

    private IndustryRepository industryList;

    public IndustryServiceImpl (IndustryRepository industryList){
        this.industryList = industryList;
    }

    @Override
    public List<Industry> listIndustries() {
        return industryList.findAll();
    }

    
    @Override
    public Industry getIndustry(Long id){
        return industryList.findById(id).orElse(null);
    }
    
    @Override
    public Industry addIndustry(Industry industry) {
        return industryList.save(industry);
    }

     /**
     * Remove a industry with the given id
     * Spring Data JPA does not return a value for delete operation
     * Cascading: removing an industry will also remove all its associated reviews
     */
    @Override
    public void deleteIndustry(Long id){
        industryList.deleteById(id);
    }
    
 
    
}
