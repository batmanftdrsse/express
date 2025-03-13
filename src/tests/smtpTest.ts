import nodemailer from 'nodemailer';

async function testSmtp() {
  // Criar transportador SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  });

  try {
    // Enviar email
    const info = await transporter.sendMail({
      from: `"${process.env.MAILERSEND_FROM_NAME}" <${process.env.MAILERSEND_FROM_EMAIL}>`,
      to: "seu-email@gmail.com",
      subject: "Teste SMTP",
      text: "Teste de email via SMTP",
      html: "<b>Teste de email via SMTP</b>"
    });

    console.log("Email enviado:", info.messageId);
  } catch (error) {
    console.error("Erro ao enviar email:", error);
  }
}

testSmtp(); 