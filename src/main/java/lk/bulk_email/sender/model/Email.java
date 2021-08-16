package lk.bulk_email.sender.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.HashSet;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Email {

  private String email_client, username, password, company_name, subject, message;

  private HashSet< String > emailList;
}
