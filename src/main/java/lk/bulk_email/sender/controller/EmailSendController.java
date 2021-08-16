package lk.bulk_email.sender.controller;

import lk.bulk_email.sender.model.Email;
import lk.bulk_email.sender.util.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
@AllArgsConstructor
public class EmailSendController {

  private final EmailService emailService;

  @GetMapping
  public String firstPage(Model model) {
    model.addAttribute("page_title", "Welcome to Bulk Email sender");
    return "/index";
  }

  @PostMapping( "/mailSend" )
  public String mailSend(@ModelAttribute Email email, Model model) {
    int request_t_count = email.getEmailList().size();
    int email_s_count = 0;
    int email_r_count = 0;

    List< String > email_list = new ArrayList<>(email.getEmailList());

    for ( String s : email_list ) {
      boolean val = emailService.sendEmail(s, email.getSubject(), email.getUsername(),
                                           email.getPassword(),
                                           email.getEmail_client(), email.getMessage());
      if ( val ) {
        email_s_count = email_s_count + 1;
      } else {
        email_r_count = email_r_count + 1;
      }
    }


    //call to email service and get values
    model.addAttribute("request_t_count", request_t_count);
    model.addAttribute("email_s_count", email_s_count);
    model.addAttribute("email_r_count", email_r_count);
    model.addAttribute("message", "Successfully Your emails were send");
    System.out.println(email.toString());
    return "/index";
  }
}
