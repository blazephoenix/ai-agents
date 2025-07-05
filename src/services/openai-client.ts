/**
 * @file openai-client.ts
 * @description This file initializes and exports the OpenAI provider.
 */
import { openai } from "@ai-sdk/openai";
import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Export the configured OpenAI provider
export { openai };

export const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});