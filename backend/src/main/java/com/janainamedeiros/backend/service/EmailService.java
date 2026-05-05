package com.janainamedeiros.backend.service;

import com.janainamedeiros.backend.dto.ContactDTO;
import com.janainamedeiros.backend.model.Appointment;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Async;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class EmailService {

    private static final String RESEND_API_URL = "https://api.resend.com/emails";

    private String sendEmail(String to, String subject, String htmlContent) {
        try {
            String apiKey = System.getenv("RESEND_API_KEY");

            URL url = new URL(RESEND_API_URL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization", "Bearer " + apiKey);
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            String body = "{"
                    + "\"from\": \"onboarding@resend.dev\","
                    + "\"to\": [\"" + to + "\"],"
                    + "\"subject\": \"" + subject + "\","
                    + "\"html\": \"" + htmlContent.replace("\"", "\\\"") + "\""
                    + "}";

            try (OutputStream os = conn.getOutputStream()) {
                os.write(body.getBytes());
            }

            int responseCode = conn.getResponseCode();
            System.out.println("Email enviado para " + to + " - Status: " + responseCode);

            return "OK";

        } catch (Exception e) {
            e.printStackTrace();
            return "ERRO";
        }
    }

    @Async
    public void sendConfirmation(Appointment a) {

        String clientEmail = a.getEmail().trim().toLowerCase();
        String adminEmail = "gustavosimon4g@gmail.com";

        // =========================
        // 📩 CLIENTE
        // =========================
        String clientHtml =
                "<h2>Confirmação de Agendamento</h2>" +
                "<p>Olá " + a.getName() + ",</p>" +
                "<p>Seu agendamento foi confirmado:</p>" +
                "<ul>" +
                "<li><b>Data:</b> " + a.getDate() + "</li>" +
                "<li><b>Horário:</b> " + a.getTime() + "</li>" +
                "<li><b>Serviço:</b> " + a.getService() + "</li>" +
                "</ul>" +
                "<p>Atenciosamente,<br/>JSM Advocacia</p>";

        // =========================
        // 📩 ADMIN
        // =========================
        String adminHtml =
                "<h2>Novo Agendamento Recebido</h2>" +
                "<ul>" +
                "<li><b>Nome:</b> " + a.getName() + "</li>" +
                "<li><b>Email:</b> " + clientEmail + "</li>" +
                "<li><b>Telefone:</b> " + a.getPhone() + "</li>" +
                "<li><b>Data:</b> " + a.getDate() + "</li>" +
                "<li><b>Horário:</b> " + a.getTime() + "</li>" +
                "<li><b>Serviço:</b> " + a.getService() + "</li>" +
                "<li><b>Mensagem:</b> " + a.getMessage() + "</li>" +
                "</ul>";

        System.out.println("Enviando email para cliente...");
        sendEmail(clientEmail, "Confirmação de Agendamento", clientHtml);

        System.out.println("Enviando email para admin...");
        sendEmail(adminEmail, "Novo Agendamento Recebido", adminHtml);

        System.out.println("Emails enviados (via API)");
    }

    @Async
    public void sendContact(ContactDTO dto) {

        String html =
                "<h2>Novo Contato</h2>" +
                "<p><b>Nome:</b> " + dto.getName() + "</p>" +
                "<p><b>Email:</b> " + dto.getEmail() + "</p>" +
                "<p><b>Assunto:</b> " + dto.getSubject() + "</p>" +
                "<p><b>Mensagem:</b><br/>" + dto.getMessage() + "</p>";

        sendEmail("gustavosimon4g@gmail.com", "Novo contato do site", html);
    }
}