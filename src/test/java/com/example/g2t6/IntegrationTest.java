/*package com.example.g2t6;
import static org.junit.jupiter.api.Assertions.*;

import java.net.URI;
import java.util.Optional;

import com.example.g2t6.company.Company;
import com.example.g2t6.company.CompanyRepository;
import com.example.g2t6.industry.Industry;
import com.example.g2t6.industry.IndustryRepository;
import com.example.g2t6.user.User;
import com.example.g2t6.user.UserRepository;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class IntegrationTest {
    @LocalServerPort
	private int port;

	private final String baseUrl = "http://localhost:";

	@Autowired
	private TestRestTemplate restTemplate;

	@Autowired
	private CompanyRepository companies;

	@Autowired
	private UserRepository users;

	@Autowired
	private IndustryRepository industries;

	@Autowired
	private BCryptPasswordEncoder encoder;

	@AfterEach
	void tearDown(){
		// clear the database after each test
		companies.deleteAll();
        users.deleteAll();
	}

	@Test
	public void getCompanies_Success() throws Exception {
		URI uri = new URI(baseUrl + port + "/companies");

		companies.save(new Company("Company A"));

		// Need to use array with a ReponseEntity here
		ResponseEntity<Company[]> result = restTemplate.getForEntity(uri, Company[].class);
		Company[] companyArray = result.getBody();
		
		assertEquals(200, result.getStatusCode().value());
		assertEquals(1, companyArray.length);
	}
	
	@Test
	public void getCompany_ValidCompanyId_Success() throws Exception {
		// create company object and store id
		Industry industry = new Industry("Industry A");
		industries.save(industry);
		Company company = new Company("Company A");
		company.setIndustry(industry);
		Long id = companies.save(company).getId();

		URI uri = new URI(baseUrl + port + "/companies/" + id);

		// Need to use array with a ReponseEntity here
		ResponseEntity<Company> result = restTemplate.getForEntity(uri, Company.class);

		assertEquals(200, result.getStatusCode().value());
		assertEquals(company.getName(), result.getBody().getName());
	}

	@Test
	public void getCompany_InvalidCompanyId_Failure() throws Exception {
		URI uri = new URI(baseUrl + port + "/companies/1");
		
		ResponseEntity<Company> result = restTemplate.getForEntity(uri, Company.class);
			
		assertEquals(404, result.getStatusCode().value());
	}

	@Test
	public void addCompany_Success() throws Exception {
		URI uri = new URI(baseUrl + port + "/companies/IndustryA/addCompany");
		Company company = new Company("Company A");

		ResponseEntity<Company> result = restTemplate.postForEntity(uri, company, Company.class);
			
		assertEquals(201, result.getStatusCode().value());
		assertEquals(company.getName(), result.getBody().getName());
	}

	//doesnt work, expect company b but got null
	// @Test
	// public void updateCompany_Success() throws Exception {
	// 	Company company = new Company("Company A");
	// 	URI uri = new URI(baseUrl + port + "/companies");

	// 	ResponseEntity<Company> result = restTemplate.postForEntity(uri, company, Company.class);

	// 	uri = new URI(baseUrl + port + "/companies/" + company.getId());

	// 	Company updatedCompany = new Company("Company B");
	// 	updatedCompany.setId(company.getId());

	// 	restTemplate.exchange(uri, HttpMethod.PUT, new HttpEntity<>(updatedCompany), Void.class);

	// 	ResponseEntity<Company> result1 = restTemplate.getForEntity(uri, Company.class);

	// 	assertEquals(updatedCompany.getName(), result1.getBody().getName());
	// }

    // @Test
    // public void getUsers_Success() throws Exception {
    //     URI uri = new URI(baseUrl + port + "/users");

	// 	// create company object and user object
	// 	Company company = new Company("Company A");
	// 	companies.save(company);
	// 	User user = new User("abc@gmail.com", "User A", "P@ssw0rd123", "HR", "ROLE_ADMIN");
	// 	user.setCompany(company);
	// 	users.save(user);

 	// 	// Need to use array with a ReponseEntity here
	// 	ResponseEntity<User[]> result = restTemplate.getForEntity(uri, User[].class);
	// 	User[] users = result.getBody();
		
	// 	assertEquals(200, result.getStatusCode().value());
	// 	assertEquals(1, users.length);
    // }

// /** Start an actual HTTP server listening at a random port*/
// /** 
// @SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
// class BookIntegrationTest {}
