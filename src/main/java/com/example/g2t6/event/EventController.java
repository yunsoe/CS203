package com.example.g2t6.event;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.HashSet;
import java.util.ArrayList;
import java.util.Date;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import com.example.g2t6.company.*;
import com.example.g2t6.swabTest.*;
import com.example.g2t6.user.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import javax.sound.sampled.DataLine;
import javax.validation.Valid;

import java.time.format.DateTimeFormatter;
import java.text.ParseException;
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

    @GetMapping("/users/{userEmail}/companies/events")
    public Set<Event> getAllUpcomingEventsByUserEmail(@PathVariable (value = "userEmail") String userEmail) throws ParseException {
        User user = users.findByEmail(userEmail).orElse(null);

        if (user == null) {
            throw new UsernameNotFoundException(userEmail);
        }

        Set <Event> upcomingEvents = new HashSet <Event> ();
        Set <Event> allEvents = user.getEvents();
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate date; 
        
        for (Event event : allEvents){
            date = LocalDate.parse(event.getEventDate(), formatter);
            if (date.isAfter(today) || date.isEqual(today)){
                upcomingEvents.add(event);
            }
        }
        return upcomingEvents;
    }

    @GetMapping("/users/{userEmail}/{companyId}/events")
    public Set <Event> getAllUserPastEvents(@PathVariable (value = "userEmail") String userEmail, @PathVariable (value = "companyId") Long companyId) throws ParseException {
        if(!companies.existsById(companyId)) {
            throw new CompanyNotFoundException(companyId);
        } 

        User user = users.findByEmail(userEmail).orElse(null);

        if (user == null) {
            throw new UsernameNotFoundException(userEmail);
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        Set <Event> pastEvents = new HashSet <Event> ();
        Set <Event> allEvents = user.getEvents();
        LocalDate today = LocalDate.now();

        LocalDate date; 
        
        for (Event event : allEvents){
            date = LocalDate.parse(event.getEventDate(), formatter);
            if (date.isBefore(today)){
                pastEvents.add(event);
            }
        }
        return pastEvents;
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

    @GetMapping("swabTests/events/{companyId}/{eventId}")
    public boolean getLocationStatus (@PathVariable (value = "companyId") Long companyId, @PathVariable (value = "eventId") Long eventId) {
        if(!companies.existsById(companyId)) {
            throw new CompanyNotFoundException(companyId);
        } 

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        LocalDate today = LocalDate.now();  

        List <SwabTest> positiveSwabTests = new ArrayList <SwabTest> ();

        //get all positive swab tests in the last 14 days 
        for (int i = 0; i < 14; i++) {
            positiveSwabTests.addAll(swabTestService.listSwabHistoryByResulTestsAndDate(true, today.minusDays(i)));
        }
        Set <User>  positiveUsers = new HashSet <User> ();
        Set <String> positiveLocations = new HashSet <String> ();

        LocalDate date;
        //get all the users who tested positive in the last 14 days 
        for (SwabTest swabTest : positiveSwabTests){
            positiveUsers.add(swabTest.getUser());
        }
        //get the locations where they attended events in the last 14 days 
        for (User user : positiveUsers){
            for (Event event : user.getEvents()){
                date = LocalDate.parse(event.getEventDate(), formatter);
                if (date.isBefore(today) && date.isAfter(today.minusDays(14))){
                    positiveLocations.add(event.getLocation());
                }
            }
        }
        //check if the location of the event is contained in the set 
        return events.findByIdAndCompanyId(eventId,companyId).map(event -> {
            for (String location : positiveLocations){
                if (location.equals(event.getLocation())){
                    return true;
                }
            } return false;
        }).orElseThrow(() -> new EventNotFoundException(eventId));
        }

    @GetMapping("swabTests/users/{companyId}/{eventId}")
    public int getEventStatus (@PathVariable (value = "companyId") Long companyId, @PathVariable (value = "eventId") Long eventId) {
        if(!companies.existsById(companyId)) {
            throw new CompanyNotFoundException(companyId);
        } 
        LocalDate date = LocalDate.now();  

        List <SwabTest> positiveSwabTests = new ArrayList <SwabTest> ();

        for (int i = 0; i < 14; i++) {
            positiveSwabTests.addAll(swabTestService.listSwabHistoryByResulTestsAndDate(true, date.minusDays(i)));
        }
        Set <User>  positiveUsers = new HashSet <User> ();

        for (SwabTest swabTest : positiveSwabTests){
            positiveUsers.add(swabTest.getUser());
        }
        
        return events.findByIdAndCompanyId(eventId,companyId).map(event -> {
            Set <User> userList = event.getUsers();
            positiveUsers.retainAll(userList);
            return positiveUsers.size();
        }).orElseThrow(() -> new EventNotFoundException(eventId));        
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
    

