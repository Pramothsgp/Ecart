package com.jarvistech.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jarvistech.backend.model.mail.Mail;
import com.jarvistech.backend.service.MailService;

@RestController
@RequestMapping("/api/mail")
public class MailController {
    
    @Autowired
    private MailService mailService;

    @PostMapping("/send-mail")
    public String sendMail(@RequestBody Mail mail) {
        try{
            return mailService.sendMail(mail);
        } catch (Exception e) {
            return "Error sending email: " + e.getMessage();
        }
    }

    @PostMapping("send-aligned-mail")
    public String sendAlignedMail(@RequestBody Mail mail) {
        try{
            return mailService.sendAlignedMail(mail);
        } catch (Exception e) {
            return "Error sending email: " + e.getMessage();
        }
    }
}
