import { ToolLoopAgent, InferAgentUIMessage, stepCountIs } from 'ai';
import { nvidiaModel } from '../provider';
import { generateSchemaTool } from '../tools/generate-schema';
import { modifySchemaTool } from '../tools/modify-schema';
import { generateQueryTool } from '../tools/generate-query';

export const sqlAgent = new ToolLoopAgent({
  model: nvidiaModel,
  instructions: `You are an expert SQL database architect and query writer.
You assist users in designing database schemas, modifying them, and generating SQL queries against them.
Always refer to the schema context provided by the system.
If the user asks to generate a new schema, use the generateSchema tool.
If the user asks to modify the existing schema, use the modifySchema tool.
If the user asks to write a SQL query against the schema, use the generateQuery tool.
Be concise and helpful. When a tool successfully executes, briefly summarize what you did.`,
  tools: {
    generateSchema: generateSchemaTool,
    modifySchema: modifySchemaTool,
    generateQuery: generateQueryTool,
  },
  stopWhen: stepCountIs(10),
});

export type SQLAgentUIMessage = InferAgentUIMessage<typeof sqlAgent>;
