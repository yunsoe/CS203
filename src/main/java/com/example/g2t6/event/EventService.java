package com.example.g2t6.event;

import java.util.List;


public interface EventService {

    public EventDto addEvent (EventDto eventDto);
    public List <EventDto> getAllEvents();
    public EventDto updateEvent (Long eventId, EventDto event);
    public String deleteEvent (Long eventId);
    
}
