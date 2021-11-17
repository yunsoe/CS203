package com.example.g2t6.industry;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class IndustryServiceImpl implements IndustryService {

    private IndustryRepository industryList;

    public IndustryServiceImpl (IndustryRepository industryList){
        this.industryList = industryList;
    }

    /**
     * Get a list of all industries in the system
     */
    @Override
    public List<Industry> listIndustries() {
        return industryList.findAll();
    }

    /**
     * Get an industry with the given id
     */
    @Override
    public Industry getIndustry(Long id){
        return industryList.findById(id).orElse(null);
    }

    /**
     * Add a new industry
     */
    @Override
    public Industry addIndustry(Industry industry) {
        return industryList.save(industry);
    }

     /**
     * Remove a industry with the given id
     * Spring Data JPA does not return a value for delete operation
     * Cascading: removing an industry will also remove all its associated companies 
     */
    @Override
    public void deleteIndustry(Long id){
        industryList.deleteById(id);
    }
    
 
    
}
