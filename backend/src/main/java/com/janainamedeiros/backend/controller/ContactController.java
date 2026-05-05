package com.janainamedeiros.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.janainamedeiros.backend.dto.ContactDTO;
import com.janainamedeiros.backend.service.EmailService;

@RestController
@RequestMapping("/contact")
@CrossOrigin("*")
public class ContactController {

    private final EmailService emailService;;

    public ContactController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping
    public void send(@RequestBody ContactDTO dto){
        emailService.sendContact(dto);
    }
    
}
