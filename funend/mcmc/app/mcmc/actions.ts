"use server";

import { metropolisHastings } from "@/utils/mcmc";
import { normalDistribution, gaussianProposal } from "@/utils/distributions";

type MCMCConfig = {
    target: "normal" | "poisson"; // Add more as needed
    numSamples: number;
    stepSize: number;
    start: number;
    burnIn?: number;
};

export async function runMCMC(config: MCMCConfig) {
    const { target, numSamples, stepSize, start, burnIn = 0 } = config;

    // Select the target distribution based on user input
    let targetDistribution;
    if (target === "normal") {
        targetDistribution = normalDistribution;
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
