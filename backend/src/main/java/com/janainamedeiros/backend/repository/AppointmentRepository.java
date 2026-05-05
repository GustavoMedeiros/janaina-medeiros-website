package com.janainamedeiros.backend.repository;

import com.janainamedeiros.backend.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByDate(String date); // ✅ NOVO
}