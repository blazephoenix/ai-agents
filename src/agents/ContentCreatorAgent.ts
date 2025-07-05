import { generateText } from "ai";
import { openai } from "../services/openai-client";
import { Agent } from "./Agent";

/**
 * An agent that creates content based on a topic and trends.
 */
export class ContentCreatorAgent extends Agent<
  { topic: string; trends: string; platform: string },
  string
> {
  constructor() {
    super("Content Creator Agent");
  }

  /**
   * Simulates creating content. In a real application, this would call a local LLM or an API like OpenAI.
   * @param input An object containing the topic and trends.
   * @returns A string of generated content.
   */
  async execute({
    topic,
    trends,
    platform,
  }: {
    topic: string;
    trends: string;
    platform: string;
  }): Promise<string> {
    console.log(
      `[${this.name}] Creating content for topic "${topic}" with trends: ${trends} on ${platform}`
    );

    const hooks = [
      "Ask a provocative question about one of the trends.",
      "Make a bold, contrarian statement related to a trend.",
      "Share a surprising or little-known fact about the topic.",
      "Describe a vivid, short scenario that puts the trend in action.",
      "Use a metaphor or analogy connected to one of the trends.",
    ];

    const selectedHook = hooks[Math.floor(Math.random() * hooks.length)];

    const prompt = `
You are a creative LinkedIn thought leader writing about "${topic}" using these current trends: ${trends}.

Instructions:
- Do NOT use generic openers like "In today's world", "The industry is changing", "As we know", etc.
- Begin your post with ${selectedHook}
- Write like an ENTP 8w7, tritype 853.
- In 2-4 sentences, reflect on how these trends are shaping the future of the industry, ending with an original insight, prediction, or question.
- Make your post sound personal and inspired, but professional.
- No hashtags, no markdown formatting.
- Increase paragraph length as you see fit.
`;
    // Replace with local LLM or call to OpenAI, etc.
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      maxTokens: 4000,
    });

    let content = "";
    content = text;

    return content;
  }
} 