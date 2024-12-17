import { Distribution, DistributionType } from '../types/distributions'

const factorial = (n: number): number => {
    if (n === 0 || n === 1) return 1
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }
  

const binomialCoefficient = (n: number, k: number): number => {
  return factorial(n) / (factorial(k) * factorial(n - k))
}

const calculateDistribution = (distribution: Distribution, parameters: Record<string, number>) => {
  const points = 100
  let data: { x: number; y: number }[] = []

  switch (distribution.name) {
    case 'Bernoulli':
      data = [
        { x: 0, y: 1 - parameters.p },
        { x: 1, y: parameters.p }
      ]
      break
    case 'Binomial':
      for (let k = 0; k <= parameters.n; k++) {
        const p = binomialCoefficient(parameters.n, k) * Math.pow(parameters.p, k) * Math.pow(1 - parameters.p, parameters.n - k)
        data.push({ x: k, y: p })
      }
      break
    case 'Poisson':
      for (let k = 0; k < points; k++) {
        const p = (Math.pow(parameters.lambda, k) * Math.exp(-parameters.lambda)) / factorial(k)
        data.push({ x: k, y: p })
      }
      break
    case 'Geometric':
      for (let k = 1; k < points; k++) {
        const p = parameters.p * Math.pow(1 - parameters.p, k - 1)
        data.push({ x: k, y: p })
      }
      break
    case 'Gaussian':
      const { mu, sigma } = parameters
      for (let i = 0; i < points; i++) {
        const x = mu - 4 * sigma + (i / points) * 8 * sigma
        const y = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2))
        data.push({ x, y })
      }
      break
    case 'Exponential':
      for (let i = 0; i < points; i++) {
        const x = (i / points) * 5 / parameters.lambda
        const y = parameters.lambda * Math.exp(-parameters.lambda * x)
        data.push({ x, y })
      }
      break
    case 'Beta':
      // Simplified Beta distribution calculation
      for (let i = 0; i < points; i++) {
        const x = i / (points - 1)
        const y = Math.pow(x, parameters.alpha - 1) * Math.pow(1 - x, parameters.beta - 1)
        data.push({ x, y })
      }
      break
    case 'Gamma':
      // Simplified Gamma distribution calculation
      for (let i = 0; i < points; i++) {
        const x = (i / points) * 20
        const y = Math.pow(x, parameters.k - 1) * Math.exp(-x / parameters.theta)
        data.push({ x, y })
      }
      break
    case 'Uniform':
      data = [
        { x: parameters.a, y: 1 / (parameters.b - parameters.a) },
        { x: parameters.b, y: 1 / (parameters.b - parameters.a) }
      ]
      break
  }

  return data
}

export { calculateDistribution }

