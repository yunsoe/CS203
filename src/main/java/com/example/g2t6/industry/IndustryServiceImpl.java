package com.example.g2t6.industry;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class IndustryServiceImpl implements IndustryService {

    private IndustryRepository industries;

    public IndustryServiceImpl (IndustryRepository industries){
        this.industries = industries;
    }

    @Override
    public List<Industry> listIndustries() {
        return industries.findAll();
    }

    
    @Override
    public Industry getIndustry(Long id){
        return industries.findById(id).orElse(null);
    }
    
    @Override
    public Industry addIndustry(Industry industry) {
        return industries.save(industry);
    }

     /**
     * Remove a industry with the given id
     * Spring Data JPA does not return a value for delete operation
     * Cascading: removing an industry will also remove all its associated reviews
     */
    @Override
    public void deleteIndustry(Long id){
        industries.deleteById(id);
    }
    
 
    
}
