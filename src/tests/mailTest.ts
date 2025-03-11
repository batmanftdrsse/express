import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

async function testMailerSend() {
  const mailer = new MailerSend({
    apiKey: 'mlsn.7921b53ed158082bb29dcaf0ae1636c4a534f6ac36f0ef2c1ff433a724ead347'
  });

  const sender = new Sender(
    'no-reply@trial-jpzkmgq1ed2l059v.mlsender.net',
    'RastreioExpress'
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