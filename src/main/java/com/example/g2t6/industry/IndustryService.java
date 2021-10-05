package com.example.g2t6.industry;

import java.util.List;

public interface IndustryService {

    List<Industry> listIndustries();
    Industry getIndustry(Long id);
    Industry addIndustry(Industry industry);

    /**
     * Change method's signature: do not return a value for delete operation
     * @param id 
     */
    void deleteIndustry(Long id);
    
}
