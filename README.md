# AI Agents Marketing Workflow

This project demonstrates a multi-agent AI system for automating a marketing workflow. It uses a series of specialized AI agents to perform tasks such as trend scouting and content creation.

## Features

The workflow is orchestrated by a main controller and consists of the following agents:

-   **Trend Scout Agent**: Scans the web for the latest trends related to a specific topic using the `o4-mini-deep-research` model from OpenAI.
-   **Content Creator Agent**: Generates engaging content (e.g., a LinkedIn post) based on the identified trends and a given topic, utilizing the `gpt-4o` model.
-   **(Planned) Social Media Manager Agent**: Responsible for posting the generated content to social media platforms. (Currently commented out in the code).
-   **(Planned) Analytics Agent**: Designed to analyze the performance of the posted content. (Currently commented out in the code).

## Tech Stack

-   [TypeScript](https://www.typescriptlang.org/)
-   [Node.js](https://nodejs.org/)
-   [Vercel AI SDK](https://sdk.vercel.ai/) for seamless integration with AI models.
-   [OpenAI API](https://openai.com/docs)
-   [Zod](https://zod.dev/) for type validation (though not heavily used in the current version).
-   `dotenv` for managing environment variables.
-   `pnpm` as the package manager.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/installation) installed.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd ai-agents
    ```

2.  Install the dependencies using pnpm:
    ```bash
    pnpm install
    ```

3.  Create a `.env` file in the root of the project:
    ```
    touch .env
    ```

4.  Add your OpenAI API key to the `.env` file:
    ```env
    OPENAI_API_KEY="your-openai-api-key"
    ```

### Running the Application

To run the application in development mode with hot-reloading, use:

```bash
pnpm dev
```

This will execute the `index.ts` file using `ts-node`.

To build the project, you can use:

```bash
pnpm build
```

And to run the compiled JavaScript code:

```bash
pnpm start
```

## Workflow Logic

The main workflow is defined in the `MarketingWorkflow` class inside `index.ts`. It executes the agents in a sequence:

1.  The `TrendScoutAgent` is called with a topic (e.g., "supply chain compliance").
2.  The trends returned by the scout are passed to the `ContentCreatorAgent`.
3.  The `ContentCreatorAgent` generates a post for a specified platform (e.g., "LinkedIn").
4.  The final content is logged to the console.

You can modify the `topic` and `platform` in the `main` function at the bottom of `index.ts` to experiment with different inputs.

## Future Work

-   Implement the `SocialMediaManagerAgent` to post content to actual social media platforms using their respective APIs.
-   Implement the `AnalyticsAgent` to fetch and process post-performance data.
-   Add more sophisticated error handling and state management for the workflow.
-   Expand the capabilities of the existing agents. 