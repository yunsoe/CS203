package com.example.g2t6.event;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.g2t6.company.*;
import org.springframework.beans.factory.annotation.Autowired;


@RestController 
public class EventController {

    @Autowired
    private EventRepository events;

    @Autowired
    private CompanyRepository companies; 

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

    @PostMapping("/companies/{companyId}/events")
    public Event addEvent (@PathVariable (value = "companyId") Long companyId, @RequestBody Event event) {
        return companies.findById(companyId).map(company -> {
            event.setCompany(company);
            return events.save(event);
        }).orElseThrow(() -> new CompanyNotFoundException(companyId));
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
            events.delete(event);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new EventNotFoundException(eventId));
    }
}
    

