export class EmailSequenceManager {
  private readonly MINIMUM_STEP_TIME = 24 * 60 * 60 * 1000; // 24 horas em milissegundos
  private readonly MAX_STEP_JUMP = 2; // Máximo de etapas que podem ser puladas

  public async updateSequenceStep(
    sequenceId: number,
    newStep: number,
    changedBy: string
  ) {
    const sequence = await prisma.emailSequences.findUnique({
      where: { id: sequenceId },
      include: { 
        emailLogs: true 
      }
    });

    if (!sequence) {
      throw new Error('Sequência não encontrada');
    }

    // Validações
    await this.validateStepChange(sequence, newStep);

    const previousStep = sequence.current_step;

    // Atualiza a sequência
    await prisma.emailSequences.update({
      where: { id: sequenceId },
      data: { 
        current_step: newStep,
        last_email_sent_at: new Date()
      }
    });

    // Registra no histórico
    await prisma.sequenceHistory.create({
      data: {
        email_sequence_id: sequenceId,
        previous_step: previousStep,
        new_step: newStep,
        changed_by: changedBy
      }
    });
  }

  private async validateStepChange(sequence: any, newStep: number) {
    // Valida se não está pulando muitas etapas
    if (newStep - sequence.current_step > this.MAX_STEP_JUMP) {
      throw new Error('Não é permitido pular mais de 2 etapas por vez');
    }

    // Valida tempo mínimo entre etapas
    if (sequence.last_email_sent_at) {
      const timeSinceLastEmail = Date.now() - sequence.last_email_sent_at.getTime();
      if (timeSinceLastEmail < this.MINIMUM_STEP_TIME) {
        throw new Error('É necessário aguardar 24 horas entre as etapas');
      }
    }

    // Valida se todos os emails anteriores foram enviados
    const sentEmails = sequence.emailLogs.map(log => log.step);
    for (let step = 1; step < newStep; step++) {
      if (!sentEmails.includes(step)) {
        throw new Error(`O email da etapa ${step} ainda não foi enviado`);
      }
    }
  }

  // Método para atualização em lote
  public async updateBatchSequences(
    sequenceIds: number[], 
    newStep: number,
    changedBy: string
  ) {
    for (const id of sequenceIds) {
      try {
        await this.updateSequenceStep(id, newStep, changedBy);
      } catch (error) {
        console.error(`Erro ao atualizar sequência ${id}:`, error);
        // Continua com as próximas sequências mesmo se uma falhar
      }
    }
  }
} 