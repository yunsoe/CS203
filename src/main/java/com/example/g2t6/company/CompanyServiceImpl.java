package com.example.g2t6.company;

import java.util.List;

import org.springframework.stereotype.Service; 

@Service
public class CompanyServiceImpl implements CompanyService {

    private CompanyRepository companyList;

    public CompanyServiceImpl(CompanyRepository companyList) {
        this.companyList = companyList;
    }

    @Override
    public List<Company> listCompany() {
        return companyList.findAll();
    }

    
    @Override
    public Company getCompany(Long id){
        return companyList.findById(id).orElse(null);
    }
    
    @Override
    public Company addCompany(Company company) {
        return companyList.save(company);
    }
    
    @Override
    public Company updateCompany(Long id, Company newCompanyInfo){
        return companyList.findById(id).map(company -> {company.setTitle(newCompanyInfo.getTitle());
            return companyList.save(company);
        }).orElse(null);

    }

    /**
     * Remove a company with the given id
     * Spring Data JPA does not return a value for delete operation
     * Cascading: removing a company will also remove all its associated reviews
     */
    @Override
    public void deleteCompany(Long id){
        companyList.deleteById(id);
    }
    
}
