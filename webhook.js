import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configuração do transporte de email para SMTP4.dev
const transporter = nodemailer.createTransport({
  host: 'mail.smtp4.dev',
  port: 2525,
  secure: false, // false para portas que não são 465
  auth: {
    user: '70f0146c-ba77-4146-ab05-9a256b69f580@smtp4.dev',
    pass: 'a9484a9e336b'
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Endpoint do webhook
app.post('/webhook', (req, res) => {
  const { purchaseId, customerEmail } = req.body;

  // Enviar email automático
  const mailOptions = {
    from: '70f0146c-ba77-4146-ab05-9a256b69f580@smtp4.dev',
    to: customerEmail,
    subject: 'Confirmação de Compra',
    text: `Sua compra com ID ${purchaseId} foi confirmada!`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email enviado: ' + info.response);
  });

  res.status(200).send('Webhook recebido com sucesso');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});