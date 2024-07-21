import { MailerSend } from 'mailersend';
import { MAILSENDER_APIKEY } from '../config';

class MailSenderClient extends MailerSend {
  constructor() {
    super({
      apiKey: MAILSENDER_APIKEY
    });
  }

  async sendEmail() {
    // Send email
  }
}

const mailSenderClient = new MailSenderClient();

export { mailSenderClient };
