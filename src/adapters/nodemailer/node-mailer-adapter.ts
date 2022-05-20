import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';


const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "692c8a44c56341",
      pass: "7c2cde39bc7fec"
    }
  });


export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {

    await transport.sendMail({
        from: "Equipe feedget <oi@feedget.com>",
        to: "Junior albino <contato@feedget.com>",
        subject,
        html: body,
    })
   
  };
}