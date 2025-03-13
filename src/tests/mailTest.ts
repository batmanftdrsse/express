import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

async function testMailerSend() {
  const mailer = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY || ''
  });

  const sender = new Sender(
    process.env.MAILERSEND_FROM_EMAIL || '',
    process.env.MAILERSEND_FROM_NAME || ''
  );

  try {
    const recipients = [new Recipient('seu-email@gmail.com')]; // Coloque seu email aqui para teste

    const emailParams = new EmailParams()
      .setFrom(sender)
      .setTo(recipients)
      .setSubject('Teste de Configuração')
      .setHtml('<strong>Teste de email do RastreioExpress</strong>')
      .setText('Teste de email do RastreioExpress');

    console.log('Enviando email de teste...');
    const response = await mailer.email.send(emailParams);
    console.log('Resposta:', response);
  } catch (error) {
    console.error('Erro no teste:', error);
  }
}

testMailerSend(); 