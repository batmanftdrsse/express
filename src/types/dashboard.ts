export interface DashboardData {
  dailySales: Array<{
    date: string;
    value: number;
  }>;
  // Adicione outras propriedades conforme necessário
}

export interface DashboardStats {
  totalOrders: number
  ordersInTransit: number
  deliveredOrders: number
  monthlyRevenue: number
  dailySales: Array<{
    date: string
    value: number
  }>
  ordersByStatus: Array<{
    status: string
    count: number
  }>
  recentOrders: Array<{
    id: string
    trackingCode: string
    status: string
    createdAt: string
  }>
} 