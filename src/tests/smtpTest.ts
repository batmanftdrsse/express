import nodemailer from 'nodemailer';

async function testSmtp() {
  // Criar transportador SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.mailersend.net",
    port: 587,
    secure: false,
    auth: {
      user: "MS_dyXm3w@trial-jpzkmgq1ed2l059v.mlsender.net",
      pass: "mssp.HlaXEdC.0r83ql3jdp0gzw1j.q0gmhD4"
    }
  });

  try {
    // Enviar email
    const info = await transporter.sendMail({
      from: '"RastreioExpress" <no-reply@trial-jpzkmgq1ed2l059v.mlsender.net>',
      to: "nicolasfranciscosouzafernando@gmail.com", // Substitua pelo seu email
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