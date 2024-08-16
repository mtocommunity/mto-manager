import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import Config from '../config';
import { getTextAsset } from '../utils';

class EmailSender {
  private client: SESClient;

  constructor() {
    this.client = new SESClient({
      region: Config.AWS.REGION,
      credentials: {
        accessKeyId: Config.AWS.ACCESS_KEY_ID,
        secretAccessKey: Config.AWS.SECRET_ACCESS_KEY
      }
    });
  }

  /**
   * Send verification email
   * @param email email to send verification email
   * @param code code to verify account
   * @returns boolean
   */
  async sendVerifyEmail(email: string, code: string): Promise<boolean> {
    const params = this.basicEmailParams(email, 'MTO Manager Verification');

    params.Message.Body.Html.Data = (await getTextAsset('verification-code.html')).replace('{{code}}', code);

    try {
      await this.client.send(new SendEmailCommand(params));
      return true;
    } catch (error) {
      return false;
    }
  }

  basicEmailParams(email: string, subject: string) {
    return {
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: 'Hello, this is a test email!'
          }
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject
        }
      },
      Source: Config.EMAIL.NO_REPLY
    };
  }
}

const emailSender = new EmailSender();

export default emailSender;
