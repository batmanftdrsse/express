import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const funnelData = await prisma.$transaction(async (tx: PrismaClient) => {
    const totalSequences = await tx.emailSequences.count();
    const activeSequences = await tx.emailSequences.count({
      where: { status: 'active' }
    });
    const completedSequences = await tx.emailSequences.count({
      where: { status: 'completed' }
    });

    const stepCounts = await tx.emailSequences.groupBy({
      by: ['current_step'],
      _count: true,
      where: { status: 'active' }
    });

    return {
      totalSequences,
      activeSequences,
      completedSequences,
      stepCounts,
      sequences: await tx.emailSequences.findMany({
        where: { status: 'active' },
        take: 10,
        orderBy: { started_at: 'desc' }
      })
    };
  });

  return res.json(funnelData);
} 