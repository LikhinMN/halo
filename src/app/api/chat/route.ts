import { createAgentUIStreamResponse, UIMessage, generateId } from 'ai';
import { sqlAgent } from '@/lib/ai/agents/sql-agent';

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, schemaContext }: { messages: UIMessage[]; schemaContext?: string } = await req.json();
  
  let finalMessages = messages;
  if (schemaContext) {
    // Inject schema context into the conversation as a system message
    finalMessages = [
      {
        id: generateId(),
        role: 'system',
        parts: [{ type: 'text', text: `Current Database Schema Context:\n${schemaContext}` }],
      },
      ...messages
    ];
  }

  return createAgentUIStreamResponse({
    agent: sqlAgent,
    uiMessages: finalMessages,
  });
}
