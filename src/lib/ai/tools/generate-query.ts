import { tool } from 'ai';
import { z } from 'zod';

export const generateQueryTool = tool({
  description: 'Generate a SQL query based on a natural language question. Use this tool when the user asks for a SQL query, like a SELECT, INSERT, UPDATE, or DELETE.',
  inputSchema: z.object({
    explanation: z.string().describe('Brief explanation of how the query works'),
    sql: z.string().describe('The generated SQL query string'),
    dialect: z.enum(['postgresql', 'mysql', 'sqlite']).describe('The SQL dialect used'),
  }),
  execute: async ({ sql, explanation, dialect }) => {
    return { sql, explanation, dialect, status: 'success' };
  },
});
