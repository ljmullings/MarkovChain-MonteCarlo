export function metropolisHastings(
    targetProb: (x: number) => number,
    proposalSampler: (x: number) => number,
    numSamples: number,
    start: number
  ): number[] {
    const samples: number[] = [];
    let current = start;
  
    for (let i = 0; i < numSamples; i++) {
      const proposed = proposalSampler(current);
      const acceptanceRatio = Math.min(1, targetProb(proposed) / targetProb(current));
  
      if (Math.random() < acceptanceRatio) {
        current = proposed; // Accept the proposed sample
      }
      samples.push(current);
    }
  
    return samples;
  }
  