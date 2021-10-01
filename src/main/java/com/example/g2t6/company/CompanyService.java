package com.example.g2t6.company;

import java.util.List;

public interface CompanyService {
    List<Company> listCompany();
    Company getCompany(Long id);
    Company addCompany(Company company);
    Company updateCompany(Long id, Company company);


    /**
     * Change method's signature: do not return a value for delete operation
     * @param id 
     */


    void deleteCompany(Long id);
    
}
