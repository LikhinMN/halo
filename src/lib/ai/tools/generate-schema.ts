import { tool } from 'ai';
import { z } from 'zod';

const columnSchema = z.object({
  name: z.string(),
  type: z.string().describe('SQL data type (e.g., VARCHAR(255), INTEGER, TIMESTAMP)'),
  isPrimaryKey: z.boolean(),
  isForeignKey: z.boolean(),
  isNullable: z.boolean(),
  defaultValue: z.string().optional(),
  references: z.object({
    table: z.string(),
    column: z.string(),
  }).optional(),
});

const tableSchema = z.object({
  id: z.string().describe('A unique identifier for the table'),
  name: z.string(),
  columns: z.array(columnSchema),
});

const relationshipSchema = z.object({
  id: z.string().describe('A unique identifier for the relationship edge'),
  sourceTable: z.string().describe('The ID of the source table'),
  sourceColumn: z.string().describe('The name of the source column'),
  targetTable: z.string().describe('The ID of the target table'),
  targetColumn: z.string().describe('The name of the target column'),
  type: z.enum(['one-to-one', 'one-to-many', 'many-to-many']),
});

export const generateSchemaTool = tool({
  description: 'Generate a complete database schema and return the structured JSON data. Use this tool when the user asks to create, build, or generate a database schema from scratch.',
  inputSchema: z.object({
    explanation: z.string().describe('Brief explanation of the schema design'),
    tables: z.array(tableSchema).describe('List of tables in the schema'),
    relationships: z.array(relationshipSchema).describe('List of relationships between tables'),
  }),
  execute: async ({ tables, relationships, explanation }) => {
    return { tables, relationships, explanation, status: 'success' };
  },
});
