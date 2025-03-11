import { EmailService } from '../services/EmailService'

async function testEmail() {
  const emailService = new EmailService()
  
  try {
    await emailService.sendTemplateEmail(
      'seu-email@gmail.com', // Email para teste
      TEMPLATES.WELCOME,
      {
        name: 'Usuário Teste',
        tracking_code: 'TEST123456'
      }
    )
    console.log('Email de teste enviado com sucesso!')
  } catch (error) {
    console.error('Erro no teste:', error)
  }
}

// Executar teste
testEmail() 