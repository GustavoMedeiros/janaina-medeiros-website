package com.janainamedeiros.backend.controller;

import com.janainamedeiros.backend.model.Appointment;
import com.janainamedeiros.backend.service.AppointmentService;
import com.janainamedeiros.backend.service.EmailService;

import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
@CrossOrigin("*")
public class AppointmentController {

    private final AppointmentService service;
    private final EmailService emailService;

    public AppointmentController(AppointmentService service, EmailService emailService) {
        this.service = service;
        this.emailService = emailService;
    }

    @PostMapping
    public Appointment create(@RequestBody Appointment appointment) {

        System.out.println("EMAIL RECEBIDO BACK: [" + appointment.getEmail() + "]");

        Appointment saved = service.save(appointment);

        emailService.sendConfirmation(saved);

        return saved;
    }

    @GetMapping
    public List<Appointment> findAll() {
        return service.findAll();
    }

    @GetMapping("/times")
    public List<String> getBookedTimes(@RequestParam String date) {
        return service.getBookedTimes(date);
    }

    @GetMapping("/test-email")
    public String testEmail() {
        Appointment a = new Appointment();
        a.setName("Teste");
        a.setEmail("gustavosimon4g@gmail.com"); // SEU EMAIL
        a.setDate("2026-04-29");
        a.setTime("10:00");
        a.setService("Teste");

        emailService.sendConfirmation(a);

        return "Email enviado (teste)";
    }
}