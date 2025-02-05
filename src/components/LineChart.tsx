import { Line, LineChart as RechartsLineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { date: '08/01', value: 10 },
  { date: '11/01', value: 15 },
  { date: '14/01', value: 12 },
  { date: '17/01', value: 18 },
  { date: '20/01', value: 20 },
  { date: '23/01', value: 25 },
  { date: '26/01', value: 22 },
  { date: '29/01', value: 30 },
  { date: '01/02', value: 35 },
  { date: '05/02', value: 28 }
]

export function LineChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#3B82F6" 
          strokeWidth={2}
          dot={false}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
} 