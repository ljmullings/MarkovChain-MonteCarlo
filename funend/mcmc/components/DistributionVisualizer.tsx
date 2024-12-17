import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Distribution, DistributionType } from '@/types/distributions'
import { calculateDistribution } from '@/utils/distributionCalculations'

interface DistributionVisualizerProps {
  distribution: Distribution
  parameters: Record<string, number>
}

const DistributionVisualizer: React.FC<DistributionVisualizerProps> = ({ distribution, parameters }) => {
  const data = React.useMemo(() => calculateDistribution(distribution, parameters), [distribution, parameters])

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DistributionVisualizer

