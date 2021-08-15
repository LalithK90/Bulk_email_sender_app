package lk.bulk_email.sender.controller;

import lk.bulk_email.sender.model.Email;
import lk.bulk_email.sender.util.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@AllArgsConstructor
public class EmailSendController {

  private final EmailService emailService;

  @PostMapping( "/mailSend" )
  public String mailSend(@ModelAttribute Email email, Model model) {
    //call to email service and get values
    model.addAttribute("email_s_count","sample");
    model.addAttribute("email_r_count","sample");
    model.addAttribute("message","sample");
    System.out.println(email.toString());
    return "/index";
  }
}
