import { NextFunction, Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  session: {
    userId?: number;
    lastActivity?: number;
  }
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const SESSION_TIMEOUT = 10 * 60 * 1000; // 10 minutos em milissegundos
  
  // Verifica se existe uma sessão
  if (!req.session.userId) {
    return res.redirect('/login');
  }

  // Verifica timeout da sessão
  const currentTime = Date.now();
  const lastActivity = req.session.lastActivity || 0;
  
  if (currentTime - lastActivity > SESSION_TIMEOUT) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
    return;
  }

  // Atualiza o timestamp da última atividade
  req.session.lastActivity = currentTime;
  next();
}; 