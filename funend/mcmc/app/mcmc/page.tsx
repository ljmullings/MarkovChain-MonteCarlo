"use client";

import { useState } from "react";
import { runMCMC } from "./actions";

export default function MCMCPage() {
  const [samples, setSamples] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const handleRunMCMC = async () => {
    setLoading(true);

    const config = {
      target: "normal" as const,
      numSamples: 1000,
      stepSize: 0.5,
      start: 0,
      burnIn: 200,
    };

    const result = await runMCMC(config);
    setSamples(result);
    setLoading(false);
  };

  return (
    <div>
      <h1>Monte Carlo Markov Chain Simulator</h1>
      <button onClick={handleRunMCMC} disabled={loading}>
        {loading ? "Running..." : "Run Simulation"}
      </button>

      {samples.length > 0 && (
        <div>
          <h2>Samples</h2>
          <pre>{JSON.stringify(samples.slice(0, 10), null, 2)}...</pre>
        </div>
      )}
    </div>
  );
}
