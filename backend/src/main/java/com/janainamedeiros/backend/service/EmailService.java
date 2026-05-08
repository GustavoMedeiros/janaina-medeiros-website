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
            System.out.println("RESEND_API_KEY = " + apiKey);

            URL url = new URL(RESEND_API_URL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization", "Bearer " + apiKey);
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setDoOutput(true);

            String body = "{"
                    + "\"from\": \"JSM Advocacia <contato@janainamedeirosadvocacia.com.br>\","
                    + "\"reply_to\": \"adv.janainamedeiros@gmail.com\","
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
        String adminEmail = "adv.janainamedeiros@gmail.com";

        // =========================
        // 📩 CLIENTE
        // =========================
        String clientHtml =
            "<div style='margin:0;padding:40px 0;background:#1a1414;font-family:Arial,sans-serif;color:#ffffff;'>"

            + "<table width='100%' cellpadding='0' cellspacing='0'>"
            + "<tr>"
            + "<td align='center'>"

            // CARD
            + "<table width='600' cellpadding='0' cellspacing='0' "
            + "style='background:#241b1b;border-radius:18px;overflow:hidden;"
            + "box-shadow:0 10px 30px rgba(0,0,0,0.4);'>"

            // HEADER
            + "<tr>"
            + "<td style='background:#120d0d;padding:35px;text-align:center;'>"

            + "<h1 style='margin:0;"
            + "font-size:38px;"
            + "letter-spacing:3px;"
            + "color:#d4b06a;"
            + "font-family:Georgia,serif;'>"
            + "JSM ADVOCACIA"
            + "</h1>"

            + "<p style='margin-top:12px;"
            + "font-size:15px;"
            + "color:#c9c9c9;'>"
            + "Confirmação de Agendamento"
            + "</p>"

            + "</td>"
            + "</tr>"

            // BODY
            + "<tr>"
            + "<td style='padding:45px;'>"

            + "<h2 style='margin-top:0;"
            + "font-size:28px;"
            + "color:#ffffff;'>"
            + "Olá, " + a.getName() + " 👋"
            + "</h2>"

            + "<p style='font-size:16px;"
            + "line-height:1.8;"
            + "color:#d7d7d7;'>"
            + "Seu agendamento foi realizado com sucesso."
            + "</p>"

            // BOX
            + "<div style='margin-top:30px;"
            + "background:#1a1414;"
            + "border:1px solid #d4b06a;"
            + "border-radius:14px;"
            + "padding:28px;'>"

            + "<p style='margin:12px 0;font-size:16px;'>"
            + "<strong style='color:#d4b06a;'>📅 Data:</strong> "
            + a.getDate()
            + "</p>"

            + "<p style='margin:12px 0;font-size:16px;'>"
            + "<strong style='color:#d4b06a;'>⏰ Horário:</strong> "
            + a.getTime()
            + "</p>"

            + "<p style='margin:12px 0;font-size:16px;'>"
            + "<strong style='color:#d4b06a;'>📌 Serviço:</strong> "
            + a.getService()
            + "</p>"

            + "</div>"

            // TEXTO
            + "<p style='margin-top:35px;"
            + "font-size:15px;"
            + "line-height:1.8;"
            + "color:#cfcfcf;'>"
            + "Caso precise alterar seu horário ou tenha alguma dúvida, "
            + "responda este email."
            + "</p>"

            + "</td>"
            + "</tr>"

            // FOOTER
            + "<tr>"
            + "<td style='padding:28px;"
            + "background:#120d0d;"
            + "text-align:center;'>"

            + "<p style='margin:0;"
            + "font-size:14px;"
            + "color:#9f9f9f;'>"
            + "© JSM Advocacia • Todos os direitos reservados"
            + "</p>"

            + "</td>"
            + "</tr>"

            + "</table>"

            + "</td>"
            + "</tr>"
            + "</table>"

            + "</div>";

        // =========================
        // 📩 ADMIN
        // =========================
        String adminHtml =
            "<div style='margin:0;padding:40px 0;background:#1a1414;font-family:Arial,sans-serif;color:#ffffff;'>"

            + "<table width='100%' cellpadding='0' cellspacing='0'>"
            + "<tr>"
            + "<td align='center'>"

            + "<table width='600' cellpadding='0' cellspacing='0' "
            + "style='background:#241b1b;border-radius:18px;overflow:hidden;'>"

            + "<tr>"
            + "<td style='background:#120d0d;padding:35px;text-align:center;'>"

            + "<h1 style='margin:0;color:#d4b06a;"
            + "font-size:34px;font-family:Georgia,serif;'>"
            + "NOVO AGENDAMENTO"
            + "</h1>"

            + "</td>"
            + "</tr>"

            + "<tr>"
            + "<td style='padding:40px;'>"

            + "<p><strong style='color:#d4b06a;'>👤 Cliente:</strong> "
            + a.getName() + "</p>"

            + "<p><strong style='color:#d4b06a;'>📧 Email:</strong> "
            + clientEmail + "</p>"

            + "<p><strong style='color:#d4b06a;'>📞 Telefone:</strong> "
            + a.getPhone() + "</p>"

            + "<p><strong style='color:#d4b06a;'>📅 Data:</strong> "
            + a.getDate() + "</p>"

            + "<p><strong style='color:#d4b06a;'>⏰ Horário:</strong> "
            + a.getTime() + "</p>"

            + "<p><strong style='color:#d4b06a;'>📌 Serviço:</strong> "
            + a.getService() + "</p>"

            + "<p><strong style='color:#d4b06a;'>📝 Mensagem:</strong><br/>"
            + a.getMessage() + "</p>"

            + "</td>"
            + "</tr>"

            + "</table>"

            + "</td>"
            + "</tr>"
            + "</table>"

            + "</div>";

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

        sendEmail("adv.janainamedeiros@gmail.com", "Novo contato do site", html);
    }
}
