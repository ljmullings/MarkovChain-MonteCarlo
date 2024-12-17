'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DistributionVisualizer from '@/components/DistributionVisualizer'
import ParameterInputs from '@/components/parameterInputs'
import { Distribution, DistributionType } from '@/types/distributions'

const discreteDistributions: Distribution[] = [
  { name: 'Bernoulli', type: DistributionType.Discrete },
  { name: 'Binomial', type: DistributionType.Discrete },
  { name: 'Poisson', type: DistributionType.Discrete },
  { name: 'Geometric', type: DistributionType.Discrete },
]

const continuousDistributions: Distribution[] = [
  { name: 'Gaussian', type: DistributionType.Continuous },
  { name: 'Exponential', type: DistributionType.Continuous },
  { name: 'Beta', type: DistributionType.Continuous },
  { name: 'Gamma', type: DistributionType.Continuous },
  { name: 'Uniform', type: DistributionType.Continuous },
]

export default function Home() {
  const [selectedDistribution, setSelectedDistribution] = useState<Distribution>(discreteDistributions[0])
  const [parameters, setParameters] = useState<Record<string, number>>({})

  const handleDistributionChange = (value: string) => {
    const newDistribution = [...discreteDistributions, ...continuousDistributions].find(d => d.name === value)
    if (newDistribution) {
      setSelectedDistribution(newDistribution)
      setParameters({})
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Probability Distributions Explorer</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Distribution Selection</CardTitle>
            <CardDescription>Choose a distribution to explore</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="discrete" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="discrete">Discrete</TabsTrigger>
                <TabsTrigger value="continuous">Continuous</TabsTrigger>
              </TabsList>
              <TabsContent value="discrete">
                <Select onValueChange={handleDistributionChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a discrete distribution" />
                  </SelectTrigger>
                  <SelectContent>
                    {discreteDistributions.map((dist) => (
                      <SelectItem key={dist.name} value={dist.name}>
                        {dist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TabsContent>
              <TabsContent value="continuous">
                <Select onValueChange={handleDistributionChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a continuous distribution" />
                  </SelectTrigger>
                  <SelectContent>
                    {continuousDistributions.map((dist) => (
                      <SelectItem key={dist.name} value={dist.name}>
                        {dist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Parameters</CardTitle>
            <CardDescription>Adjust the distribution parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <ParameterInputs
              distribution={selectedDistribution}
              parameters={parameters}
              setParameters={setParameters}
            />
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Visualization</CardTitle>
            <CardDescription>Distribution plot and statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <DistributionVisualizer
              distribution={selectedDistribution}
              parameters={parameters}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
