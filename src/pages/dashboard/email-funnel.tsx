import { useEffect, useState } from 'react';
import { MetricCard } from '../../components/MetricCard';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../../components/Table';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import toast from 'react-hot-toast';

interface FunnelData {
  totalSequences: number;
  activeSequences: number;
  completedSequences: number;
  stepCounts: any[];
  sequences: any[];
  totalEmailsSent: number;
  successRate: number;
}

export default function EmailFunnelPage() {
  const [funnelData, setFunnelData] = useState<FunnelData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFunnelData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/funnel-data');
      
      if (!response.ok) {
        throw new Error('Erro ao buscar dados do funil');
      }

      const data = await response.json();
      setFunnelData(data);
      setError(null);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      setError('Erro ao carregar dados do funil');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunnelData();
    const interval = setInterval(fetchFunnelData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
        Dashboard de Email Marketing
      </h1>
      
      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Total de Sequências" value={funnelData?.totalSequences || 0} />
        <MetricCard title="Sequências Ativas" value={funnelData?.activeSequences || 0} />
        <MetricCard title="Sequências Completadas" value={funnelData?.completedSequences || 0} />
        <MetricCard title="Taxa de Sucesso" value={`${funnelData?.successRate || 0}%`} />
      </div>

      {/* Tabela de Sequências */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader className="dark:text-gray-200">ID</TableHeader>
              <TableHeader className="dark:text-gray-200">Cliente</TableHeader>
              <TableHeader className="dark:text-gray-200">Status</TableHeader>
              <TableHeader className="dark:text-gray-200">Etapa</TableHeader>
              <TableHeader className="dark:text-gray-200">Ações</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {funnelData?.sequences.map((sequence) => (
              <TableRow key={sequence.id} className="dark:bg-gray-800">
                <TableCell className="dark:text-gray-200">{sequence.id}</TableCell>
                <TableCell className="dark:text-gray-200">{sequence.customer_email}</TableCell>
                <TableCell>
                  <Badge variant={sequence.status === 'active' ? 'success' : 'neutral'}>
                    {sequence.status}
                  </Badge>
                </TableCell>
                <TableCell className="dark:text-gray-200">{sequence.current_step}/6</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      toast.success('Função ainda não implementada');
                    }}
                  >
                    Reenviar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 