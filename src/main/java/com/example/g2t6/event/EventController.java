package com.example.g2t6.event;

import java.util.List;
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

    /**
    * Gets list of all events of a particular company
    * @param companyId The company ID that we want to retrieve the list of events for
    * @exception CompanyNotFoundException Company ID was not found
    * @return List of events of the company
    */
    @GetMapping("/companies/{companyId}/events")
    public List<Event> getAllEventsByCompanyId(@PathVariable (value = "companyId") Long companyId) {
        if(!companies.existsById(companyId)) {
            throw new CompanyNotFoundException(companyId);
        }
        return events.findByCompanyId(companyId);
    }

    /**
    * Gets set of events of a particular company that the user is not currently attending 
    * @param companyId The company ID that we want to retrieve the set of events for
    * @param userEmail The email of the user 
    * @exception CompanyNotFoundException Company was not found
    * @exception UsernameNotFoundException User was not found 
    * @return Set of company events that user is not attending 
    */
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

    /**
    * Gets set of all company events a user is registered for 
    * @param userEmail The email of the user we want to retrieve the set of events for 
    * @exception UsernameNotFoundException User was not found
    * @return Set of company events user is registered for
    */
    @GetMapping("/users/{userEmail}/events")
    public Set<Event> getAllEventsByUserEmail(@PathVariable (value = "userEmail") String userEmail) {
        User user = users.findByEmail(userEmail).orElse(null);

        if (user == null) {
            throw new UsernameNotFoundException(userEmail);
        }
        return user.getEvents();
    }

    /**
    * Gets set of all upcoming company events a user will be attending 
    * @param userEmail The email of the user we want to retrieve the list of events for 
    * @exception UsernameNotFoundException User was not found
    * @return Set of upcoming company events user is attending 
    */
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


    /**
    * Gets set of all past company events a user attended
    * @param userEmail The email of the user we want to retrieve the set of events for 
    * @param companyId The Company ID that we want to retrieve the set of events of 
    * @exception CompanyNotFoundException Company was not found
    * @exception UsernameNotFoundException User was not found
    * @return Set of past company events a user attended 
    */
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

    /**
    * Gets set of all users attending a particular company event
    * @param eventId The Event ID that we want to retrieve the set of users of  
    * @param companyId The Company ID that we want to retrieve the set of users of 
    * @exception CompanyNotFoundException Company was not found
    * @exception EventNotFoundException Event was not found
    * @return Set of all users attending a particular company event 
    */
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

    
    /**
    * Finds out if there were Covid-19 cases detected at a particular location
    * @param eventId The Event ID that we want to retrieve the location of  
    * @param companyId The Company ID that we want to retrieve the set of events of 
    * @exception CompanyNotFoundException Company was not found
    * @exception EventNotFoundException Event was not found
    * @return true if there were Covid-19 cases detected at the location of the event in the past two weeks and false if not
    */
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
    
    /**
    * If the event is within the last two weeks from today's date, 
    get the number of users who attended the event who tested positive within the last two weeks
    * @param eventId The Event ID that we want to retrieve the set of users of  
    * @param companyId The Company ID that we want to retrieve the set of users of 
    * @exception CompanyNotFoundException Company was not found
    * @exception EventNotFoundException Event was not found
    * @return Number of users who attended the event who tested positive within the last two weeks 
    */
    @GetMapping("swabTests/users/{companyId}/{eventId}")
    public int getEventStatus (@PathVariable (value = "companyId") Long companyId, @PathVariable (value = "eventId") Long eventId) {
        if(!companies.existsById(companyId)) {
            throw new CompanyNotFoundException(companyId);
        } 
    
        LocalDate today = LocalDate.now();  

        List <SwabTest> positiveSwabTests = new ArrayList <SwabTest> ();

        for (int i = 0; i < 14; i++) {
            positiveSwabTests.addAll(swabTestService.listSwabHistoryByResulTestsAndDate(true, today.minusDays(i)));
        }
        Set <User>  positiveUsers = new HashSet <User> ();

        for (SwabTest swabTest : positiveSwabTests){
            positiveUsers.add(swabTest.getUser());
        }
        
        return events.findByIdAndCompanyId(eventId,companyId).map(event -> {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            LocalDate date = LocalDate.parse(event.getEventDate(),formatter);

            if (date.isBefore(today.minusDays(14))){
                return 0;
            }
            Set <User> userList = event.getUsers();
            positiveUsers.retainAll(userList);
            return positiveUsers.size();
        }).orElseThrow(() -> new EventNotFoundException(eventId));        
        }

        
    /**
    * Add a new company event
    * @param userEmail The email of the User who is adding the event  
    * @param companyId The Company ID of the company that we want to add the event for
    * @param event The event to be added 
    * @exception CompanyNotFoundException Company was not found
    * @exception UsernameNotFoundException User was not found
    * @return the newly added event 
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
            //add the user who added the event to the list of people attending 
            Set <User> userList = event.getUsers();
            userList.add(user);
            Set <Event> eventList = user.getEvents();
            eventList.add(event);
            users.save(user);
            return events.save(event);
        }).orElseThrow(() -> new CompanyNotFoundException(companyId));
        }

    /**
    * Add a user to the list of users attending an event   
    * @param companyId The Company ID of the company that we want to edit the event of
    * @param eventId The Event ID of the event to be updated
    * @param userEmail The email of the user to be added to the event 
    * @exception EventNotFoundException Event was not found
    * @exception UsernameNotFoundException User was not found
    * @return The updated event 
    */
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
    
    /**
    * Remove a user from the list of users attending an event   
    * @param companyId The Company ID of the company that we want to edit the event of
    * @param eventId The Event ID of the event to be updated
    * @param userEmail The email of the user to be removed from the event 
    * @exception CompanyNotFoundException Company was not found
    * @exception EventNotFoundException Event was not found
    * @exception UsernameNotFoundException User was not found
    * @return The updated event 
    */
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
    
    /**
    * Update the details of a particular event 
    * @param eventId The Event ID of the event to be updated
    * @param companyId The Company ID of the company that we want to edit the event of
    * @param newEvent The updated event 
    * @exception CompanyNotFoundException Company was not found
    * @exception EventNotFoundException Event was not found
    * @return The updated event 
    */
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
    * Delete a particular event 
    * @param companyId The Company ID of the company that we want to delete the event of
    * @param eventId The Event ID of the event to be deleted
    * @exception CompanyNotFoundException Company was not found
    * @exception EventNotFoundException Event was not found
    * @return ReponseEntity<>
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

   
}
    

