import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';
import { MAILSENDER_APIKEY, MAILSENDER_FROM_EMAIL } from '../config';

class MailSenderClient {
  private apiKey: string;
  private fromEmail: string;
  private varificationSent: Sender;
  private mailSend: MailerSend;

  constructor() {
    this.apiKey = MAILSENDER_APIKEY;
    this.fromEmail = MAILSENDER_FROM_EMAIL;
    this.varificationSent = new Sender(this.fromEmail, 'MTO Manager Verification');
    this.mailSend = new MailerSend({
      apiKey: this.apiKey
    });
  }

  /**
   * Send verification email
   * @param email email to send verification email
   * @param code code to verify account
   * @returns boolean
   */
  async sendVerifyEmail(email: string, code: string): Promise<boolean> {
    // Create recipient
    const recipient = [new Recipient(email)];

    // Create email params
    const emailParams = new EmailParams().setFrom(this.varificationSent).setTo(recipient).setSubject('Verifica tu cuenta').setHtml(`<p>Tu código de verifiación es: ${code}</p>`);

    try {
      await this.mailSend.email.send(emailParams);
      return true;
    } catch (error) {
      return false;
    }
  }
}

const mailSenderClient = new MailSenderClient();

export default mailSenderClient;
