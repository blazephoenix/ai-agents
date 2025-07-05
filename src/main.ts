import { MarketingWorkflow } from "./workflows";

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