import { Injectable } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import { FirstEmail } from './emailBodies/FirstEmail';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: 'picturifyy@gmail.com',
        pass: 'fmmhaxsmkafstdpt',
      },
    });
  }

  async sendPromoEmail(options: {
    to: string;
    subject: string;
    htmlBody?: string;
  }) {
    const body = FirstEmail('https://picturify-rho.vercel.app/home');
    try {
      const { to, subject, htmlBody = body } = options;
      await this.transporter.sendMail({
        to: to,
        subject: subject,
        html: htmlBody,
      });

      return true;
    } catch (error) {
      console.log(error);
    }
  }
}
