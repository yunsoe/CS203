package com.example.g2t6.event;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCompanyId(Long companyId);
    Optional<Event> findByIdAndCompanyId(Long id, Long companyId);
    
}
