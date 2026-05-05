package com.janainamedeiros.backend.service;

import com.janainamedeiros.backend.model.Appointment;
import com.janainamedeiros.backend.repository.AppointmentRepository;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository repository;

    public AppointmentService(AppointmentRepository repository) {
        this.repository = repository;
    }

    public Appointment save(@NonNull Appointment appointment) {

        // 🔒 Validação de horário já reservado
        boolean exists = repository
                .findByDate(appointment.getDate())
                .stream()
                .anyMatch(a -> a.getTime().equals(appointment.getTime()));

        if (exists) {
            throw new RuntimeException("Horário já reservado");
        }

        // 💾 Salva no banco
        return repository.save(appointment);
    }

    public List<Appointment> findAll() {
        return repository.findAll();
    }

    public List<String> getBookedTimes(String date) {
        return repository.findByDate(date)
                .stream()
                .map(Appointment::getTime)
                .toList();
    }
}