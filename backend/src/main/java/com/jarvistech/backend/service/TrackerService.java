package com.jarvistech.backend.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.jarvistech.backend.model.deliveryAgent.DeliveryAgent;
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

    public void sendLocationUpdate(DeliveryAgentLocation location){

        DeliveryAgent agent = agentRepository.findById(location.getId())
                              .orElseThrow(() -> new RuntimeException("Agent not found"));
        if(agent.getLocation() == null){
            DeliveryAgentLocation newLocation = new DeliveryAgentLocation();
            newLocation.setLatitude(location.getLatitude());
            newLocation.setLongitude(location.getLongitude());
            newLocation.setTimestamp(new Date().getTime());
            locationRepository.save(newLocation);
            agent.setLocation(newLocation);
        } else {
            agent.getLocation().setLatitude(location.getLatitude());
            agent.getLocation().setLongitude(location.getLongitude());
            agent.getLocation().setTimestamp(new Date().getTime());
        }
        agentRepository.save(agent);
        System.out.println("Location updated for agent " + agent.getId());
        System.out.println("Location updated for agent " + location.getId());
        simpMessagingTemplate.convertAndSend("/tracker/location/" + location.getId(), location);
    }

    public DeliveryAgent setDeliveryAgent(DeliveryAgentLocation location)   {
        DeliveryAgent agent = agentRepository.findById(location.getId())
                              .orElseThrow(() -> new RuntimeException("Agent not found"));
        if(agent.getLocation() == null){
            DeliveryAgentLocation newLocation = new DeliveryAgentLocation();
            newLocation.setLatitude(location.getLatitude());
            newLocation.setLongitude(location.getLongitude());
            newLocation.setTimestamp(new Date().getTime());
            locationRepository.save(newLocation);
            agent.setLocation(newLocation);
        } else {
            agent.getLocation().setLatitude(location.getLatitude());
            agent.getLocation().setLongitude(location.getLongitude());
            agent.getLocation().setTimestamp(new Date().getTime());
        }
        simpMessagingTemplate.convertAndSend("/tracker/location/" + location.getId(), location);
        return agentRepository.save(agent);
    }
}
