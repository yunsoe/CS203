package com.example.g2t6.event;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.HashSet;
import java.util.ArrayList;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.example.g2t6.company.*;
import com.example.g2t6.swabTest.*;
import com.example.g2t6.user.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import javax.validation.Valid;

import java.time.format.DateTimeFormatter;  
import java.time.LocalDate;  



@CrossOrigin
@RestController 
public class EventController {

    @Autowired
    private EventRepository events;

    @Autowired
    private CompanyRepository companies; 

    @Autowired
    private UserRepository users;

    @Autowired
    private SwabTestService swabTestService;

    @Autowired
    private SwabTestRepository swabTests;



    /**
     * This controller works with the repositories directly, without a service layer
     */
    // public EventController(EventRepository events, CompanyRepository companies){
    //     this.events = events;
    //     this.companies = companies;
    // }

    @GetMapping("/companies/{companyId}/events")
    public List<Event> getAllEventsByCompanyId(@PathVariable (value = "companyId") Long companyId) {
        if(!companies.existsById(companyId)) {
            throw new CompanyNotFoundException(companyId);
        }
        return events.findByCompanyId(companyId);
    }

    @GetMapping("/companies/{companyId}/events/{userEmail}")
    public Set<Event> getAllOtherEventsByCompanyId(@PathVariable (value = "companyId") Long companyId, @PathVariable (value = "userEmail") String userEmail) {
        if(!companies.existsById(companyId)) {
            throw new CompanyNotFoundException(companyId);
        }

        User user = users.findByEmail(userEmail).orElse(null);

        if (user == null) {
            throw new UsernameNotFoundException(userEmail);
        }

        Set <Event> unregisteredEvents = new HashSet <Event> (events.findByCompanyId(companyId));


        unregisteredEvents.removeAll(user.getEvents());

        return unregisteredEvents;
    }

    @GetMapping("/users/{userEmail}/events")
    public Set<Event> getAllEventsByUserEmail(@PathVariable (value = "userEmail") String userEmail) {
        User user = users.findByEmail(userEmail).orElse(null);

        if (user == null) {
            throw new UsernameNotFoundException(userEmail);
        }
        return user.getEvents();
    }

    
    @GetMapping("users/{companyId}/{eventId}")
    public Set<User> getAllUsersByEventIdAndCompanyId(@PathVariable (value = "companyId") Long companyId, @PathVariable (value = "eventId") Long eventId) {
        if(!companies.existsById(companyId)) {
            throw new CompanyNotFoundException(companyId);
        } 
        
        return events.findByIdAndCompanyId(eventId,companyId).map(event -> {
            Set <User> userList = event.getUsers();
            return userList;
        }).orElseThrow(() -> new EventNotFoundException(eventId));
        }

    @GetMapping("swabTests/events/{companyId}")
    public Set<Event> getAllEventsBySwabTestResultsAndCompanyId(@PathVariable (value = "companyId") Long companyId) {
        if(!companies.existsById(companyId)) {
            throw new CompanyNotFoundException(companyId);
        } 

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        LocalDate date = LocalDate.now();  

        List <SwabTest> positiveSwabTests = new ArrayList <SwabTest> ();

        
        for (int i = 0; i < 14; i++) {
            positiveSwabTests.addAll(swabTestService.listSwabHistoryByResulTestsAndDate(true, date.minusDays(i)));
        }
        Set <User>  positiveUsers = new HashSet <User> ();
        Set <Event> positiveEvents = new HashSet <Event> ();

        for (SwabTest swabTest : positiveSwabTests){
            positiveUsers.add(swabTest.getUser());
        }

        for (User user : positiveUsers){
            positiveEvents.addAll(user.getEvents());
        }


        positiveEvents.retainAll(events.findByCompanyId(companyId));

        
        return positiveEvents;        
        }


    /**
     * 
     * Add a new event given CompanyId
     * Update an existing event, given the eventId and the companyId
     * Delete an existing event, given the eventId and the companyId
     * 
     * Need to make sure that the event is associated with a company
     * 
     *
     * 
     * @param companyId
     * @param eventId
     * @param newEvent
     * @return
     */

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/users/{userEmail}/companies/{companyId}/events")
    public Event addEvent (@PathVariable (value = "userEmail") String userEmail, @PathVariable (value = "companyId") Long companyId, @RequestBody Event event) {
        
        User user = users.findByEmail(userEmail).orElse(null);

        if (user == null) {
            throw new UsernameNotFoundException(userEmail);
        }
        
        return companies.findById(companyId).map(company -> {
            event.setCompany(company);
            events.save(event);
            Set <User> userList = event.getUsers();
            userList.add(user);
            Set <Event> eventList = user.getEvents();
            eventList.add(event);
            users.save(user);
            return events.save(event);
        }).orElseThrow(() -> new CompanyNotFoundException(companyId));
        }

    
    @PutMapping("companies/{companyId}/events/{eventId}/users/{userEmail}")
    public Event addEventUsers (@PathVariable (value = "companyId") Long companyId, @PathVariable (value = "eventId") Long eventId,
    @PathVariable (value = "userEmail") String userEmail) {
        
        User user = users.findByEmail(userEmail).orElse(null);

        if (user == null) {
            throw new UsernameNotFoundException(userEmail);
        }

        return events.findByIdAndCompanyId(eventId,companyId).map(event -> {
            Set <User> userList = event.getUsers();
            userList.add(user);
            Set <Event> eventList = user.getEvents();
            eventList.add(event);
            users.save(user);
            return events.save(event);
        }).orElseThrow(() -> new EventNotFoundException(eventId));
        }
    
    @PutMapping("/companies/{companyId}/events/{eventId}")
    public Event updateEvent(@PathVariable (value = "eventId") Long eventId,
                                 @PathVariable (value = "companyId") Long companyId,
                                 @RequestBody Event newEvent) {
        if(!companies.existsById(companyId)) {
            throw new CompanyNotFoundException(companyId);
        }
        return events.findByIdAndCompanyId(eventId,companyId).map(event -> {
            event.setEvent(newEvent.getEvent());
            event.setEventDate(newEvent.getEventDate());
            event.setLocation(newEvent.getLocation());
            return events.save(event);
        }).orElseThrow(() -> new EventNotFoundException(eventId));
    }

    /**
     * Use a ResponseEntity to have more control over the response sent to client
     */
    @DeleteMapping("/companies/{companyId}/events/{eventId}")
    public ResponseEntity<?> deleteEvent(@PathVariable (value = "companyId") Long companyId,
                              @PathVariable (value = "eventId") Long eventId) {
        
        if(!companies.existsById(companyId)) {
            throw new CompanyNotFoundException(companyId);
        }

        

        return events.findByIdAndCompanyId(eventId,companyId).map(event -> {
            Set <User> userList = event.getUsers();
            for (User user : userList){
                user.getEvents().remove(event);
            }
            events.delete(event);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new EventNotFoundException(eventId));
    }

    @PutMapping("/events/{companyId}/{eventId}/users/{userEmail}")
    public Event deleteEventUser(@PathVariable (value = "companyId") Long companyId,
                              @PathVariable (value = "eventId") Long eventId,  @PathVariable (value = "userEmail") String userEmail) {
        
        if(!companies.existsById(companyId)) {
            throw new CompanyNotFoundException(companyId);
        }

        User user = users.findByEmail(userEmail).orElse(null);

        if (user == null) {
            throw new UsernameNotFoundException(userEmail);
        }

        return events.findByIdAndCompanyId(eventId,companyId).map(event -> {
            Set <User> userList = event.getUsers();
            userList.remove(user);
            Set <Event> eventList = user.getEvents();
            eventList.remove(event);
            users.save(user);
            return events.save(event);
        }).orElseThrow(() -> new EventNotFoundException(eventId));
    }
}
    

