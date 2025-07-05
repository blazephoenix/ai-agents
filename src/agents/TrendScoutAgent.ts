import { Agent } from "./Agent";
import { openai, openaiClient } from "../services/openai-client";
import { generateText } from "ai";

/**
 * An agent that scouts for marketing trends on a given topic.
 */
export class TrendScoutAgent extends Agent<string, string> {
  constructor() {
    super("Trend Scout Agent");
  }

  /**
   * Generates marketing trends for a given topic using an AI model.
   * @param topic The topic to find trends for.
   * @returns A string of AI-generated trends.
   */
  async execute(topic: string): Promise<string> {
    console.log(`[${this.name}] Scouting for trends on: ${topic}`);

    const pastTags = [
      "Supply chain transparency",
      "ESG compliance integration",
      "Digital certification platforms",
      "AI-driven compliance tools",
      "Remote audit adoption",
      "Cybersecurity compliance focus",
    ];

    const system_message = `You are an industry trend scout. Your job is to search recent news, articles, and thought pieces to find *real, current trends* shaping the "${topic}" industry right now.

Instructions:
- Look for the latest events, launches, viral topics, shifts in public discourse, or recurring themes in the last 3 months.
- Do NOT suggest marketing strategies, generic technologies, or hypothetical trends.
- Only use trends with clear evidence in recent news, articles, or social media.
- For each trend, condense it into a concise, specific tag (1–5 words), ideally echoing the language from the source.
- Output 3 tags, separated by commas. Do not explain or elaborate.
- Do not use pastTags: ${pastTags.join(", ")}.
- If stuck, search for tangentially related trends.
- Do not use hashtags.`;

    // const response = await openaiClient.responses.create({
    //   model: "o4-mini-deep-research",
    //   input: system_message,
    //   reasoning: {
    //     summary: "auto",
    //   },
    //   tools: [
    //     { type: "web_search_preview" },
    //   ],
    // });

    // const resultText =
    //   response.output[response.output.length - 1]?.content[0].text;

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: system_message,
      maxTokens: 4000,
    });

    //If pastTags found in the result, re-run the prompt
    if (
      pastTags.some((tag) =>
        text.toLowerCase().includes(tag.toLowerCase())
      )
    ) {
      return this.execute(topic);
    }

    console.log(text, "new tags");

    const trends = text;

    return trends;
  }
}
