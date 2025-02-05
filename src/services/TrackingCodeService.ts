export class TrackingCodeService {
  private async generateUniqueCode(): Promise<string> {
    const prefix = 'PC';
    const suffix = 'BR';
    
    while (true) {
      // Gera 9 dígitos aleatórios
      const numbers = Math.random().toString().slice(2, 11);
      const code = `${prefix}${numbers}${suffix}`;
      
      // Verifica se já existe
      const exists = await prisma.trackingCodes.findUnique({
        where: { code }
      });
      
      if (!exists) {
        // Cria novo registro
        await prisma.trackingCodes.create({
          data: { 
            code,
            status: 'available'
          }
        });
        return code;
      }
    }
  }

  public async allocateTrackingCode(emailSequenceId: number): Promise<string> {
    // Procura um código disponível
    const trackingCode = await prisma.trackingCodes.findFirst({
      where: { status: 'available' }
    });

    if (!trackingCode) {
      // Se não encontrar, gera um novo
      return this.generateUniqueCode();
    }

    // Atualiza o código como usado
    await prisma.trackingCodes.update({
      where: { id: trackingCode.id },
      data: {
        status: 'used',
        used_at: new Date(),
        email_sequence_id: emailSequenceId
      }
    });

    return trackingCode.code;
  }
} 