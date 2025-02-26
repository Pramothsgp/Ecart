package com.jarvistech.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.jarvistech.backend.model.mail.Mail;

import jakarta.mail.internet.MimeMessage;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    public String sendMail(Mail mail) throws Exception {
        // Send email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mail.getTo());
        message.setSubject(mail.getSubject());
        message.setText(mail.getBody());
        mailSender.send(message);
        return "Email sent successfully to  " + mail.getTo();
    }

    public String sendAlignedMail(Mail mail) throws Exception {
        // Send email
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(mail.getTo());
        helper.setSubject(mail.getSubject());

        String htmlContent = "<html>\n" + //
                        "<head>\n" + //
                        "    <style>\n" + //
                        "        body {\n" + //
                        "            font-family: 'Arial', sans-serif;\n" + //
                        "            background-color: #f4f4f4;\n" + //
                        "            padding: 20px;\n" + //
                        "            text-align: center;\n" + //
                        "        }\n" + //
                        "        .email-container {\n" + //
                        "            max-width: 500px;\n" + //
                        "            background: #ffffff;\n" + //
                        "            padding: 30px;\n" + //
                        "            border-radius: 10px;\n" + //
                        "            box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);\n" + //
                        "            margin: auto;\n" + //
                        "        }\n" + //
                        "        .logo {\n" + //
                        "            width: 80px;\n" + //
                        "            margin-bottom: 10px;\n" + //
                        "        }\n" + //
                        "        h2 {\n" + //
                        "            color: #333;\n" + //
                        "            margin-bottom: 10px;\n" + //
                        "        }\n" + //
                        "        p {\n" + //
                        "            font-size: 16px;\n" + //
                        "            color: #555;\n" + //
                        "            margin-bottom: 20px;\n" + //
                        "        }\n" + //
                        "        .otp-box {\n" + //
                        "            font-size: 24px;\n" + //
                        "            font-weight: bold;\n" + //
                        "            color: #ff6b6b;\n" + //
                        "            background: #f8d7da;\n" + //
                        "            display: inline-block;\n" + //
                        "            padding: 10px 20px;\n" + //
                        "            border-radius: 5px;\n" + //
                        "            margin-bottom: 20px;\n" + //
                        "        }\n" + //
                        "        .footer {\n" + //
                        "            font-size: 12px;\n" + //
                        "            color: #999;\n" + //
                        "            margin-top: 20px;\n" + //
                        "        }\n" + //
                        "    </style>\n" + //
                        "</head>\n" + //
                        "<body>\n" + //
                        "    <div class=\"email-container\">\n" + //
                        "        <img class=\"logo\" src=\"https://img.freepik.com/premium-vector/shopping-cart-logo-design-vector-modern-shopping-cart-logo-template_472998-93.jpg?w=2000\" alt=\"Company Logo\">\n" + //
                        "        <h2>Your OTP Code</h2>\n" + //
                        "        <p>Use the code below to complete your verification process. This OTP is valid for <strong>10 minutes</strong>.</p>\n" + //
                        "        <div class=\"otp-box\">" + mail.getBody() + "</div>\n" + //
                        "        <p>If you did not request this code, please ignore this email.</p>\n" + //
                        "        <p>Thank you,<br><strong>Your Company Team</strong></p>\n" + //
                        "        <div class=\"footer\">© 2025 Your Company. All rights reserved.</div>\n" + //
                        "    </div>\n" + //
                        "</body>\n" + //
                        "</html>\n" + //
                        "";
        helper.setText(htmlContent, true);
        mailSender.send(message);
        return "Email sent successfully to  " + mail.getTo();
    }

}
