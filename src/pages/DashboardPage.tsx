import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Package, Mail, AlertTriangle, Truck, CheckCircle, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { dashboardService } from '../services/dashboardService';
import { MetricCard } from '../components/MetricCard';
import { formatCurrency } from '../utils/formatCurrency';
import type { DashboardStats } from '../types/dashboard';

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        const data = await dashboardService.getStats();
        console.log('Dashboard data:', data);
        
        // Mapear os dados recebidos para o formato esperado
        const formattedData: DashboardStats = {
          totalOrders: data.totalOrders || 0,
          ordersInTransit: data.ordersByStatus?.find(s => s.status === 'in_transit')?.count || 0,
          deliveredOrders: data.ordersByStatus?.find(s => s.status === 'delivered')?.count || 0,
          monthlyRevenue: data.monthlyRevenue || 0,
          dailySales: data.dailySales || [],
          ordersByStatus: data.ordersByStatus?.map(status => ({
            status: status.status === 'waiting_payment' ? 'Aguardando'
              : status.status === 'in_transit' ? 'Em Trânsito'
              : status.status === 'delivered' ? 'Entregue'
              : status.status === 'refused' ? 'Recusado'
              : status.status === 'chargedback' ? 'Estornado'
              : status.status,
            count: status.count
          })) || [],
          recentOrders: data.recentOrders?.map(order => ({
            id: order.id,
            trackingCode: order.trackingCode,
            status: order.status === 'waiting_payment' ? 'Aguardando'
              : order.status === 'in_transit' ? 'Em Trânsito'
              : order.status === 'delivered' ? 'Entregue'
              : order.status === 'refused' ? 'Recusado'
              : order.status === 'chargedback' ? 'Estornado'
              : order.status,
            createdAt: order.createdAt
          })) || []
        };
        
        setStats(formattedData);
      } catch (err) {
        console.error('Error loading dashboard:', err);
        setError('Falha ao carregar dados do dashboard');
      } finally {
        setLoading(false);
      }
    }

    if (isAuthenticated) {
      loadDashboard();
    }
  }, [isAuthenticated]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!stats) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Dashboard
        </h1>

        {/* Grid de métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Total de Pedidos"
            value={stats.totalOrders?.toString() || '0'}
            icon={<Package className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
            className="bg-white dark:bg-gray-800 shadow-sm"
          />
          <MetricCard
            title="Pedidos em Trânsito"
            value={stats.ordersInTransit?.toString() || '0'}
            icon={<Truck className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />}
            className="bg-white dark:bg-gray-800 shadow-sm"
          />
          <MetricCard
            title="Pedidos Entregues"
            value={stats.deliveredOrders?.toString() || '0'}
            icon={<CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />}
            className="bg-white dark:bg-gray-800 shadow-sm"
          />
          <MetricCard
            title="Vendas do Mês"
            value={formatCurrency(stats.monthlyRevenue || 0)}
            icon={<DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
            className="bg-white dark:bg-gray-800 shadow-sm"
          />
        </div>

        {/* Gráfico de Status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Status dos Pedidos
          </h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats.ordersByStatus}
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="status" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  stroke="#6B7280"
                  style={{ fontSize: '0.875rem' }}
                />
                <YAxis
                  stroke="#6B7280"
                  style={{ fontSize: '0.875rem' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgb(31, 41, 55)',
                    border: 'none',
                    borderRadius: '0.375rem',
                    color: 'white'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#6366F1"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabela de Pedidos Recentes */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mt-8 overflow-hidden">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white p-6 border-b border-gray-200 dark:border-gray-700">
            Pedidos Recentes
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Código
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {order.trackingCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {order.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 