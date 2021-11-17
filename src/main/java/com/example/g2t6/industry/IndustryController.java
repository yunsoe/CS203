package com.example.g2t6.industry;

import java.util.List;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@CrossOrigin
public class IndustryController {

    @Autowired
    private IndustryService industryService;

    /**
     * List all industries in the system
     * @return list of all industries
     */
    @GetMapping("/industries")
    public List<Industry> getIndustries(){
        return industryService.listIndustries();
    }

    /**
     * Search for industry with the given id
     * If there is no industry with the given "id", throw a IndustryNotFoundException
     * @param id
     * @exception IndustryNotFoundException Industry not found
     * @return industry with the given id
     */
    @GetMapping("/industries/{id}")
    public Industry getIndustry(@PathVariable Long id){
        Industry industry = industryService.getIndustry(id);

        if(industry == null) throw new IndustryNotFoundException(id);
        return industryService.getIndustry(id);

    }
    /**
     * Add a new industry with POST request to "/industries"
     * @param industry
     * @return list of all industries
     */
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/industries")
    public Industry addIndustry(@RequestBody Industry industry){
        return industryService.addIndustry(industry);
    }

    /**
     * Remove a industry with the DELETE request to "/industries/{id}"
     * If there is no industry with the given "id", throw a IndustryNotFoundException
     * @param id
     */
    @DeleteMapping("/industries/{id}")
    public void deleteIndustry(@PathVariable Long id){
        try{
            industryService.deleteIndustry(id);
         }catch(EmptyResultDataAccessException e) {
            throw new IndustryNotFoundException(id);
         }
    }
    
}
