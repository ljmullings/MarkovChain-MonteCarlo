import React from 'react'
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Distribution } from '../types/distributions'

interface ParameterInputsProps {
  distribution: Distribution
  parameters: Record<string, number>
  setParameters: React.Dispatch<React.SetStateAction<Record<string, number>>>
}

const getDefaultParameters = (distribution: Distribution): Record<string, number> => {
  switch (distribution.name) {
    case 'Bernoulli':
      return { p: 0.5 }
    case 'Binomial':
      return { n: 10, p: 0.5 }
    case 'Poisson':
      return { lambda: 1 }
    case 'Geometric':
      return { p: 0.5 }
    case 'Gaussian':
      return { mu: 0, sigma: 1 }
    case 'Exponential':
      return { lambda: 1 }
    case 'Beta':
      return { alpha: 2, beta: 2 }
    case 'Gamma':
      return { k: 2, theta: 2 }
    case 'Uniform':
      return { a: 0, b: 1 }
    default:
      return {}
  }
}

const ParameterInputs: React.FC<ParameterInputsProps> = ({ distribution, parameters, setParameters }) => {
  const defaultParams = getDefaultParameters(distribution)

  React.useEffect(() => {
    setParameters(defaultParams)
  }, [distribution])

  const handleParameterChange = (param: string, value: number) => {
    setParameters(prev => ({ ...prev, [param]: value }))
  }

  return (
    <div className="space-y-4">
      {Object.entries(defaultParams).map(([param, defaultValue]) => (
        <div key={param} className="space-y-2">
          <Label htmlFor={param}>{param}: {parameters[param]?.toFixed(2) || defaultValue.toFixed(2)}</Label>
          <Slider
            id={param}
            min={0}
            max={param === 'n' ? 100 : 10}
            step={0.01}
            value={[parameters[param] || defaultValue]}
            onValueChange={([value]) => handleParameterChange(param, value)}
          />
        </div>
      ))}
    </div>
  )
}

export default ParameterInputs

