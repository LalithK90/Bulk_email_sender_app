package lk.bulk_email.sender.util.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.File;
import java.util.Properties;

@Service
public class EmailService {

  public boolean sendEmail(String receiverEmail, String subject, String username, String password,
                                   String email_client, String message_user){
    Properties props;
    switch ( email_client ) {
      case "Google":
        props = GmailConfig();
        break;
      case  "AWSSec":
        props = AWSSecConfig();
        break;
      default:
        props = OutlookConfig();


    }


    // Get the Session object.
    Session session = Session.getInstance(props,                                          new Authenticator() {
                                            protected PasswordAuthentication getPasswordAuthentication() {
                                              return new PasswordAuthentication(username, password);
                                            }
                                          });
    try {
      // Create a default MimeMessage object.
      Message message = new MimeMessage(session);

      // Set From: header field of the header.
      message.setFrom(new InternetAddress(username));

      // Set To: header field of the header.
      message.setRecipients(Message.RecipientType.TO,
                            InternetAddress.parse(receiverEmail));

      // Set Subject: header field
      message.setSubject(subject);

      // Create the message part
      BodyPart messageBodyPart = new MimeBodyPart();

      messageBodyPart.setText(message_user);

      // Now set the actual message
      messageBodyPart.setText("\n This email was send using Bulk Email Sender : ");

//      // Create a multipart message
//      Multipart multipart = new MimeMultipart();
//
//      // Set text message part
//      multipart.addBodyPart(messageBodyPart);


      // Send message
      Transport.send(message);

      System.out.println("Sent message successfully....");

      return true;
    } catch ( MessagingException e ) {
      throw new RuntimeException(e);

    }

  }

  //email client configuration
  private Properties AWSSecConfig() {
    Properties props = new Properties();
    props.put("mail.smtp.host", "email-smtp.us-west-2.amazonaws.com");
    props.put("mail.port", 465);
    props.put("mail.smtp.starttls.enable", "true");
    props.put("mail.smtp.starttls.required", "true");
    props.put("mail.smtp.ssl.enavle", "true");
    props.put("mail.protocol", "smtps");
    props.put("mail.smtp.auth", "true");
    return props;
  }

  private Properties GmailConfig() {
    Properties props = new Properties();
    props.put("mail.smtp.host", "smtp.gmail.com");
    props.put("mail.smtp.port", 587);
    props.put("mail.debug", "true");
    props.put("mail.transport.protocol", "smtp");
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.connectiontimeout", "5000");
    props.put("mail.smtp.timeout", "5000");
    props.put("mail.smtp.writetimeout", "5000");
    props.put("mail.smtp.starttls.enable", "true");
    props.put("mail.smtp.socketFactory.port", "465");
    props.put("mail.smtp.socketFactory.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
    return props;
  }

  private Properties OutlookConfig() {
    Properties props = new Properties();
    props.put("mail.smtp.host", "smtp-mail.outlook.com");
    props.put("mail.smtp.port", 587);
    props.put("mail.protocol", "smtp");
    props.put("mail.tls", "true");
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.starttls.enable", "true");
    props.put("mail.smtp.ssl.trust", "smtp-mail.outlook.com");
    return props;
  }


}