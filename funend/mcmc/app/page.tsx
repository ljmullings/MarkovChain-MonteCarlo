import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowRight, BarChart2, GitBranch, Database, Cpu, Zap, Layers } from 'lucide-react'

const menuItems = [
  { title: 'MCMC Simulator', description: 'Monte Carlo Markov Chain Simulations', icon: BarChart2, href: '/mcmc' },
  { title: 'Probability Distribution Simulator', description: 'Check out both discrete and continuous probability distributions', icon: GitBranch, href: '/monte-carlo' },
  { title: 'Bayesian Forecasting', description: 'Feature in development', icon: Database, href: '/samples' },
  { title: 'Future Feature 1', description: 'Coming soon', icon: Cpu, href: '#' },
  { title: 'Future Feature 2', description: 'Coming soon', icon: Zap, href: '#' },
  { title: 'Future Feature 3', description: 'Coming soon', icon: Layers, href: '#' },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-8">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
          MCMC Research Tool
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Link href={item.href} key={index} className="group">
              <Card className="hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <item.icon className="h-8 w-8 text-blue-500 dark:text-blue-400" />
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                  </div>
                  <CardTitle className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
