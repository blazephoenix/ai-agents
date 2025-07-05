/**
 * @file index.ts
 * @description A multi-agent workflow for a marketing AI agent.
 */
import { generateText } from "ai";
import { openai, openaiClient } from "./openai-client";

// -------------------- Base Agent Class --------------------

/**
 * Abstract base class for all agents.
 * Defines the contract for an agent with an execute method.
 * @template TInput The type of input the agent expects.
 * @template TOutput The type of output the agent will produce.
 */
abstract class Agent<TInput, TOutput> {
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

// -------------------- Specialized Agents --------------------

/**
 * An agent that scouts for marketing trends on a given topic.
 */
class TrendScoutAgent extends Agent<string, string> {
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

    const response = await openaiClient.responses.create({
      model: "o4-mini-deep-research",
      input: system_message,
      tools: [
        { type: "web_search_preview" },
        { type: "code_interpreter", container: { type: "auto" } },
      ],
    });

    console.log(response, "response");
    const resultText = "";

    // const resultText =
    //   response.output[response.output.length - 1]?.content[0].text;

    //If pastTags found in the result, re-run the prompt
    if (
      pastTags.some((tag) =>
        resultText.toLowerCase().includes(tag.toLowerCase())
      )
    ) {
      return this.execute(topic);
    }

    console.log(resultText, "new tags");

    const trends = resultText;

    return trends;
  }
}

/**
 * An agent that creates content based on a topic and trends.
 */
class ContentCreatorAgent extends Agent<
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

/**
 * An agent that posts content to a social media platform.
 */
// class SocialMediaManagerAgent extends Agent<{ content: string; platform: string }, { status: string; platform: string; postId: number }> {
//     constructor() {
//         super("Social Media Manager Agent");
//     }

//     /**
//      * Simulates posting content to a social media platform.
//      * @param input An object containing the content and the platform.
//      * @returns An object with the post status and ID.
//      */
//     async execute({ content, platform }: { content: string; platform: string }): Promise<{ status: string; platform: string; postId: number }> {
//         console.log(`[${this.name}] Posting to ${platform}...`);
//         // Replace with real social API call as needed
//         const postId = Math.floor(Math.random() * 1000000); // Simulate a post ID
//         console.log(`[${this.name}] > [${platform}] POSTED: ${content}`);
//         return { status: "success", platform, postId };
//     }
// }

/**
 * An agent that analyzes the performance of a social media post.
 */
// class AnalyticsAgent extends Agent<number, { postId: number; views: number; engagement: number }> {
//     constructor() {
//         super("Analytics Agent");
//     }

//     /**
//      * Simulates analyzing post performance.
//      * @param postId The ID of the post to analyze.
//      * @returns An object with analytics data.
//      */
//     async execute(postId: number): Promise<{ postId: number; views: number; engagement: number }> {
//         console.log(`[${this.name}] Analyzing post ID: ${postId}`);
//         // Replace with real analytics lookup
//         return { postId, views: 1200 + Math.floor(Math.random() * 300), engagement: 0.12 };
//     }
// }

// -------------------- Workflow Orchestration --------------------

/**
 * Orchestrates the marketing workflow by executing a sequence of agents.
 */
class MarketingWorkflow {
  private trendScout: TrendScoutAgent;
  private contentCreator: ContentCreatorAgent;
  // private socialMediaManager: SocialMediaManagerAgent;
  // private analytics: AnalyticsAgent;

  constructor() {
    this.trendScout = new TrendScoutAgent();
    this.contentCreator = new ContentCreatorAgent();
    // this.socialMediaManager = new SocialMediaManagerAgent();
    // this.analytics = new AnalyticsAgent();
  }

  /**
   * Runs the entire marketing campaign workflow.
   * @param topic The initial topic for the campaign.
   * @param platform The social media platform to post on.
   */
  async run(topic: string, platform: string): Promise<void> {
    console.log("--- Starting Marketing AI Workflow ---");

    // 1. Scout for trends
    const trends = await this.trendScout.execute(topic);
    console.log(`[Workflow] Trends found: ${trends}\n`);

    // 2. Create content
    const content = await this.contentCreator.execute({
      topic,
      trends,
      platform,
    });
    console.log(`[Workflow] Content created: "${content}"\n`);

    // // 3. Post to social media
    // const postResult = await this.socialMediaManager.execute({ content, platform });
    // console.log(`[Workflow] Post successful on ${postResult.platform} with ID: ${postResult.postId}\n`);

    // // 4. Analyze post-performance
    // const analyticsResult = await this.analytics.execute(postResult.postId);
    // console.log("[Workflow] Analytics Report:");
    // console.log(JSON.stringify(analyticsResult, null, 2));

    // console.log("\n--- Marketing AI Workflow Finished ---");
  }
}

// -------------------- Main Execution --------------------

/**
 * Main function to run the marketing workflow.
 */
async function main() {
  const workflow = new MarketingWorkflow();
  await workflow.run("b2b compliance iso42001", "LinkedIn");
}

main().catch((error) => {
  console.error("Workflow failed:", error);
});
