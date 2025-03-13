import { Line, LineChart as RechartsLineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

interface LineChartProps {
  data: Array<{
    date: string
    value: number
  }>
}

export function LineChart({ data }: LineChartProps) {
  if (!data || data.length === 0) {
    return <div>Sem dados para exibir</div>
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="date" 
          stroke="#6B7280"
          style={{ fontSize: '0.875rem' }}
        />
        <YAxis 
          stroke="#6B7280"
          style={{ fontSize: '0.875rem' }}
          tickFormatter={(value) => `R$ ${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgb(31, 41, 55)',
            border: 'none',
            borderRadius: '0.375rem',
            color: 'white'
          }}
          formatter={(value) => [`R$ ${value}`, 'Valor']}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#6366F1"
          strokeWidth={2}
          dot={{ fill: '#6366F1', strokeWidth: 2 }}
          activeDot={{ r: 6, fill: '#6366F1' }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
} 