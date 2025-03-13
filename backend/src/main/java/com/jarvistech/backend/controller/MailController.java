package com.jarvistech.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jarvistech.backend.dto.Message;
import com.jarvistech.backend.model.mail.Mail;
import com.jarvistech.backend.service.MailService;

@CrossOrigin
@RestController
@RequestMapping("/api/mail")
public class MailController {
    
    @Autowired
    private MailService mailService;

    @PostMapping("/send-mail")
    public ResponseEntity<?> sendMail(@RequestBody Mail mail) {
        try{
            return ResponseEntity.ok( new Message(mailService.sendMail(mail)));
        } catch (Exception e) {
            return  ResponseEntity.ok(new Message("Error sending email: " + e.getMessage()));
        }
    }

    @PostMapping("send-aligned-mail")
    public ResponseEntity<?> sendAlignedMail(@RequestBody Mail mail) {
        try{
            return ResponseEntity.ok( new Message(mailService.sendAlignedMail(mail)));
        } catch (Exception e) {
            return ResponseEntity.ok( new Message("Error sending email: " + e.getMessage()));
        }
    }
}
