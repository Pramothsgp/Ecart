package com.jarvistech.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.jarvistech.backend.model.deliveryAgent.DeliveryAgentLocation;
import com.jarvistech.backend.repository.AgentRepository;
import com.jarvistech.backend.repository.LocationRepository;

@Service
public class TrackerService {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private LocationRepository locationRepository;

    public void sendLocationUpdate(DeliveryAgentLocation location) {
        locationRepository.save(location);
        simpMessagingTemplate.convertAndSend("/tracker/location/" + location.getId(), location);
    }
}
