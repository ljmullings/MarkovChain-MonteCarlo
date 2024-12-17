"use server";

import { metropolisHastings } from "@/utils/mcmc";
import { normalDistribution, gaussianProposal } from "@/utils/distributionCalculations";

type MCMCConfig = {
  target: "normal" | "poisson"; // Add more as needed
  numSamples: number;
  stepSize: number;
  start: number;
  burnIn?: number;
  mu?: number; // Mean for the normal distribution
  sigma?: number; // Standard deviation for the normal distribution
};

export async function runMCMC(config: MCMCConfig) {
  const { target, numSamples, stepSize, start, burnIn = 0, mu = 0, sigma = 1 } = config;

  // Select the target distribution based on user input
  let targetDistribution: (x: number) => number;

  if (target === "normal") {
    // Partially apply mu and sigma to get a single-parameter function
    targetDistribution = (x: number) => normalDistribution(x, mu, sigma);
  } else {
    throw new Error("Unsupported distribution type");
  }

  // Proposal distribution: symmetric Gaussian
  const proposalSampler = (current: number) =>
    gaussianProposal(current, stepSize);

  // Run the Metropolis-Hastings algorithm
  const samples = metropolisHastings(
    targetDistribution,
    proposalSampler,
    numSamples,
    start
  );

  // Remove burn-in samples
  const postBurnInSamples = samples.slice(burnIn);

  return postBurnInSamples;
}
