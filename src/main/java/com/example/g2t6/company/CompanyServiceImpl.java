package com.example.g2t6.company;

import java.util.List;

import org.springframework.stereotype.Service; 

@Service
public class CompanyServiceImpl implements CompanyService {

    private CompanyRepository companyList;

    
    public CompanyServiceImpl(CompanyRepository companyList) {
        this.companyList = companyList;
    }

    /**
     * List all companies in the system
     * @return list of all companies
     */
    @Override
    public List<Company> listCompany() {
        return companyList.findAll();
    }

    /**
     * Search for company with the given id
     * If there is no company with the given "id", return null.
     * @param id
     * @return company with the given id, or else null
     */
    @Override
    public Company getCompany(Long id){
        return companyList.findById(id).orElse(null);
    }
    
    /**
     * Add a new company to companyList
     * @param company
     * @return company added
     */
    @Override
    public Company addCompany(Company company) {
        return companyList.save(company);
    }
    
    /**
     * Search for company with the given id and update the company object
     * If there is no company with the given "id", return null.
     * @param id, company
     * @return company updated or null
     */
    @Override
    public Company updateCompany(Long id, Company newCompanyInfo){
        return companyList.findById(id).map(company -> {company.setName(newCompanyInfo.getName());
            return companyList.save(company);
        }).orElse(null);

    }

    /**
     * Remove a company with the given id
     * Spring Data JPA does not return a value for delete operation
     * Cascading: removing a company will also remove all its associated users
     */
    @Override
    public void deleteCompany(Long id){
        companyList.deleteById(id);
    }
    
}
