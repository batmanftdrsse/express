import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export class MailerService {
  private mailer: MailerSend;
  private sender: Sender;

  constructor() {
    this.mailer = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY || '',
    });

    this.sender = new Sender(
      "no-reply@trial-vywj2lpr0mm47oqz.mlsender.net",
      "RastreioExpress"
    );
  }

  async sendEmail(
    to: string,
    templateId: string,
    variables: Record<string, any>
  ) {
    try {
      console.log('Preparando email com:', { to, templateId, variables });

      const recipients = [new Recipient(to)];

      const emailParams = new EmailParams()
        .setFrom(this.sender)
        .setTo(recipients)
        .setTemplateId(templateId)
        .setPersonalization([
          {
            email: to,
            data: variables || {},
          },
        ]);

      console.log('Parâmetros do email:', JSON.stringify(emailParams, null, 2));

      const response = await this.mailer.email.send(emailParams);
      console.log('Resposta do MailerSend:', response);
      
      return response;
    } catch (error: any) {
      console.error('Erro detalhado do MailerSend:', {
        error: error.body || error,
        stack: error.stack
      });
      throw new Error(`Erro ao enviar email: ${error.message || 'Erro desconhecido'}`);
    }
  }
} 