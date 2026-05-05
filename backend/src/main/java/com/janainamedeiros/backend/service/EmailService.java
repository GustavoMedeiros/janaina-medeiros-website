package com.janainamedeiros.backend.service;

import com.janainamedeiros.backend.dto.ContactDTO;
import com.janainamedeiros.backend.model.Appointment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Async;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendConfirmation(Appointment a) {

        String clientEmail = a.getEmail().trim().toLowerCase();
        String adminEmail = "gustavosimon4g@gmail.com"; // seu email

        // =========================
        // 📩 EMAIL PARA CLIENTE
        // =========================
        SimpleMailMessage clientMsg = new SimpleMailMessage();

        clientMsg.setFrom("gustavosimon4g@gmail.com");
        clientMsg.setTo(clientEmail);
        clientMsg.setSubject("Confirmação de Agendamento");

        clientMsg.setText(
            "Olá " + a.getName() + ",\n\n" +
            "Seu agendamento foi confirmado:\n\n" +
            "📅 Data: " + a.getDate() + "\n" +
            "⏰ Horário: " + a.getTime() + "\n" +
            "📌 Serviço: " + a.getService() + "\n\n" +
            "Atenciosamente,\nJSM Advocacia"
        );

        // =========================
        // 📩 EMAIL PARA ADMIN (VOCÊ)
        // =========================
        SimpleMailMessage adminMsg = new SimpleMailMessage();

        adminMsg.setFrom("gustavosimon4g@gmail.com");
        adminMsg.setTo(adminEmail);
        adminMsg.setSubject("📥 Novo Agendamento Recebido");

        adminMsg.setText(
            "Novo agendamento recebido:\n\n" +
            "👤 Nome: " + a.getName() + "\n" +
            "📧 Email: " + clientEmail + "\n" +
            "📞 Telefone: " + a.getPhone() + "\n\n" +
            "📅 Data: " + a.getDate() + "\n" +
            "⏰ Horário: " + a.getTime() + "\n" +
            "📌 Serviço: " + a.getService() + "\n\n" +
            "📝 Mensagem: " + a.getMessage()
        );

        // =========================
        // 🚀 ENVIO
        // =========================
        System.out.println("Enviando email para cliente...");
        mailSender.send(clientMsg);

        System.out.println("Enviando email para admin...");
        mailSender.send(adminMsg);

        System.out.println("Emails enviados com sucesso!");
    }

    @Async
    public void sendContact(ContactDTO dto) {

        SimpleMailMessage msg = new SimpleMailMessage();

        msg.setFrom("gustavosimon4g@gmail.com");
        msg.setTo("gustavosimon4g@gmail.com");
        msg.setReplyTo(dto.getEmail());
        msg.setSubject("Novo contato do site");
        msg.setText(
            "Nome: " + dto.getName() + "\n" +
            "Email: " + dto.getEmail() + "\n" +
            "Assunto: " + dto.getSubject() + "\n\n" +
            "Mensagem:\n" + dto.getMessage()
        );

        mailSender.send(msg);
    }
}
