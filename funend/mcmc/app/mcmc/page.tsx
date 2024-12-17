"use client";

import { useState } from "react";
import { runMCMC } from "./actions";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2 } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip);

export default function MCMCPage() {
  const [samples, setSamples] = useState<number[]>([]);
  const [acceptanceRate, setAcceptanceRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRunMCMC = async () => {
    setLoading(true);

    const config = {
      target: "normal" as const,
      numSamples: 10000,
      stepSize: 0.5,
      start: 0,
      burnIn: 1000,
      mu: 0,
      sigma: 1,
    };

    const result = await runMCMC(config);

    const uniqueSamples = new Set(result);
    const acceptance = (uniqueSamples.size / result.length) * 100;

    setSamples(result);
    setAcceptanceRate(acceptance.toFixed(2) as unknown as number);
    setLoading(false);
  };

  const mean = samples.reduce((a, b) => a + b, 0) / samples.length || 0;
  const variance =
    samples.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / samples.length || 0;

  const histogramData = (() => {
    const bins: Record<string, number> = {};
    samples.forEach((x) => {
      const rounded = Math.round(x * 10) / 10;
      bins[rounded] = (bins[rounded] || 0) + 1;
    });

    const labels = Object.keys(bins).sort((a, b) => parseFloat(a) - parseFloat(b));
    const data = labels.map((key) => bins[key]);

    return {
      labels,
      datasets: [
        {
          label: "Sample Frequency",
          data,
          backgroundColor: "rgba(59, 130, 246, 0.6)",
        },
      ],
    };
  })();

  const tracePlotData = {
    labels: samples.map((_, index) => index),
    datasets: [
      {
        label: "Trace Plot (Sampled Values)",
        data: samples,
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const runningMean = samples.map((_, index) =>
    samples.slice(0, index + 1).reduce((a, b) => a + b, 0) / (index + 1)
  );

  const runningMeanData = {
    labels: samples.map((_, index) => index),
    datasets: [
      {
        label: "Running Mean",
        data: runningMean,
        borderColor: "rgba(239, 68, 68, 1)",
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 p-8">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">
          Metropolis-Hastings Simulation
        </h1>

        <Card className="mb-8 dark:bg-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <BarChart2 className="h-8 w-8 text-blue-500 dark:text-blue-400" />
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
            <CardTitle className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
              Run MCMC Simulation
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Click the button below to start the simulation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleRunMCMC}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Running..." : "Run Simulation"}
            </Button>
          </CardContent>
        </Card>

        {samples.length > 0 && (
          <div className="space-y-8">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Simulation Results</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 dark:text-gray-300">
                <p><strong>Number of Samples:</strong> {samples.length}</p>
                <p><strong>Acceptance Rate:</strong> {acceptanceRate}%</p>
                <p><strong>Empirical Mean:</strong> {mean.toFixed(4)}</p>
                <p><strong>Empirical Variance:</strong> {variance.toFixed(4)}</p>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">First 10 Samples</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
                  {JSON.stringify(samples.slice(0, 10), null, 2)}
                </pre>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Histogram of Samples</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full max-w-2xl mx-auto">
                  <Bar data={histogramData} />
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Trace Plot</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full max-w-2xl mx-auto">
                  <Line data={tracePlotData} />
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Running Mean Plot</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full max-w-2xl mx-auto">
                  <Line data={runningMeanData} />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {loading && (
          <Card className="dark:bg-gray-800">
            <CardContent className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-300">Loading... Please wait while the simulation runs.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}