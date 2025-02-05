interface PaymentAnalytics {
  averageTicket: number;
  highestAmount: number;
  lowestAmount: number;
  mostUsedPaymentMethod: {
    method: string;
    count: number;
  };
}

export class AnalyticsService {
  public async getPaymentAnalytics(): Promise<PaymentAnalytics> {
    const payments = await prisma.emailSequences.findMany({
      select: {
        amount: true,
        payment_method: true
      }
    });

    // Calcula ticket médio
    const total = payments.reduce((sum, p) => sum + p.amount, 0);
    const averageTicket = total / payments.length;

    // Encontra valores máximo e mínimo
    const amounts = payments.map(p => p.amount);
    const highestAmount = Math.max(...amounts);
    const lowestAmount = Math.min(...amounts);

    // Método de pagamento mais usado
    const methodCount = payments.reduce((acc, p) => {
      acc[p.payment_method] = (acc[p.payment_method] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostUsed = Object.entries(methodCount)
      .reduce((a, b) => a[1] > b[1] ? a : b);

    return {
      averageTicket,
      highestAmount,
      lowestAmount,
      mostUsedPaymentMethod: {
        method: mostUsed[0],
        count: mostUsed[1]
      }
    };
  }

  public async detectAnomalousAmount(amount: number): boolean {
    const avg = await prisma.emailSequences.aggregate({
      _avg: { amount: true },
      _stddev: { amount: true }
    });

    const threshold = avg._avg.amount! + (2 * avg._stddev.amount!);
    return amount > threshold;
  }
} 