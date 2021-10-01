package com.example.g2t6.company;

import javax.validation.Valid;
import java.util.List;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CompanyController {
    private CompanyService companyService;

    public CompanyController(CompanyService cs){
        this.companyService = cs;
    }

    /**
     * List all companies in the system
     * @return list of all companies
     */
    @GetMapping("/companies")
    public List<Company> getCompanies(){
        return companyService.listCompany();
    }

    /**
     * Search for company with the given id
     * If there is no company with the given "id", throw a CompanyNotFoundException
     * @param id
     * @return company with the given id
     */
    @GetMapping("/companies/{id}")
    public Company getCompany(@PathVariable Long id){
        Company company = companyService.getCompany(id);

        // Need to handle "company not found" error using proper HTTP status code
        // In this case it should be HTTP 404
        if(company == null) throw new CompanyNotFoundException(id);
        return companyService.getCompany(id);

    }
    /**
     * Add a new company with POST request to "/companies"
     * Note the use of @RequestBody
     * @param company
     * @return list of all companies
     */
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/companies")
    public Company addCompany(@Valid @RequestBody Company company) {
        return companyService.addCompany(company);
    }

    /**
     * If there is no company with the given "id", throw a CompanyNotFoundException
     * @param id
     * @param newCompanyInfo
     * @return the updated, or newly added Company
     */
    @PutMapping("/companies/{id}")
    public Company updateCompany(@PathVariable Long id, @Valid @RequestBody Company newCompanyInfo){
        Company company = companyService.updateCompany(id, newCompanyInfo);
        if(company == null) throw new CompanyNotFoundException(id);
        
        return company;
    }

    /**
     * Remove a company with the DELETE request to "/companies/{id}"
     * If there is no company with the given "id", throw a CompanyNotFoundException
     * @param id
     */
    @DeleteMapping("/companies/{id}")
    public void deleteCompany(@PathVariable Long id){
        try{
            companyService.deleteCompany(id);
         }catch(EmptyResultDataAccessException e) {
            throw new CompanyNotFoundException(id);
         }
    }
    
}
