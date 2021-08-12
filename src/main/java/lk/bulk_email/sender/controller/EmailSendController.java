package lk.bulk_email.sender.controller;

import lk.bulk_email.sender.model.Email;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class EmailSendController {

  @PostMapping( "/mailSend" )
  public String mailSend(@ModelAttribute Email email) {
    System.out.println(email.toString());
    return "/index";
  }
}
