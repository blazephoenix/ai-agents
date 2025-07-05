/**
 * @file src/agents/Agent.ts
 * @description Abstract base class for all agents.
 */

/**
 * Abstract base class for all agents.
 * Defines the contract for an agent with an execute method.
 * @template TInput The type of input the agent expects.
 * @template TOutput The type of output the agent will produce.
 */
export abstract class Agent<TInput, TOutput> {
  /**
   * @param name The name of the agent.
   */
  constructor(public name: string) {}

  /**
   * Executes the agent's task.
   * @param input The input data for the agent.
   * @returns A promise that resolves with the agent's output.
   */
  abstract execute(input: TInput): Promise<TOutput>;
} 