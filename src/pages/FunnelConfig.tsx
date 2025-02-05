import React, { useState } from 'react';

interface FunnelConfigProps {
  // props
}

export const FunnelConfig: React.FC<FunnelConfigProps> = () => {
  const [funnels, setFunnels] = useState<FunnelTemplate[]>([]);
  const [selectedFunnel, setSelectedFunnel] = useState<FunnelTemplate | null>(null);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Configuração de Funil</h1>
      
      {/* Lista de Funis */}
      <div className="mb-6">
        <h2 className="text-xl mb-2">Funis Existentes</h2>
        <div className="grid gap-4">
          {funnels.map(funnel => (
            <div 
              key={funnel.id}
              className="p-4 border rounded hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedFunnel(funnel)}
            >
              <h3 className="font-bold">{funnel.name}</h3>
              <p>Método de Pagamento: {funnel.payment_method || 'Todos'}</p>
              <p>Quantidade de Etapas: {funnel.steps.length}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Formulário de Novo Funil */}
      <div className="border-t pt-4">
        <h2 className="text-xl mb-2">Criar Novo Funil</h2>
        {/* Formulário aqui */}
      </div>
    </div>
  );
}; 