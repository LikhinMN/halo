'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, isToolUIPart } from 'ai';
import { PromptInputProvider, PromptInput, PromptInputTextarea, PromptInputSubmit } from '@/components/ai-elements/prompt-input';
import { Conversation, ConversationContent } from '@/components/ai-elements/conversation';
import { Message, MessageContent, MessageResponse } from '@/components/ai-elements/message';
import { ToolResultCard } from './tool-result-card';
import { InputGroup } from '@/components/ui/input-group';

export function ChatPanel() {
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const isGenerating = status === 'streaming' || status === 'submitted';

  return (
    <PromptInputProvider>
      <div className="flex flex-col h-full bg-background border-r border-border">
        <div className="h-14 flex items-center px-4 border-b border-border bg-card/50 shrink-0">
          <h2 className="font-semibold text-sm tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Halo
          </h2>
        </div>
        
        <Conversation>
          <ConversationContent>
            {messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent>
                  {message.parts.map((part, index) => {
                    if (part.type === 'text') {
                      return <MessageResponse key={index}>{part.text}</MessageResponse>;
                    }

                    if (isToolUIPart(part)) {
                      const isCompleted = part.state === 'output-available';
                      const toolName = 'toolName' in part ? (part as any).toolName : part.type.replace('tool-', '');
                      return (
                        <ToolResultCard 
                          key={index}
                          toolName={toolName}
                          state={isCompleted ? 'result' : 'call'}
                          result={isCompleted ? (part as any).output : null}
                        />
                      );
                    }

                    return null;
                  })}
                </MessageContent>
              </Message>
            ))}
          </ConversationContent>
        </Conversation>

        <div className="p-4 border-t border-border bg-card/50 shrink-0">
          <PromptInput
            onSubmit={({ text }) => {
              if (text.trim() === '') return;
              sendMessage({ text });
            }}
            className="flex w-full"
          >
            <InputGroup className="w-full bg-background min-h-[52px] items-end p-1">
              <PromptInputTextarea 
                placeholder="Ask about your schema..." 
                className="min-h-[44px] px-3 py-2.5"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (!isGenerating) {
                      e.currentTarget.form?.requestSubmit();
                    }
                  }
                }}
              />
              <div className="flex items-center pb-0.5 pr-0.5">
                <PromptInputSubmit status={status} onStop={stop} variant={isGenerating ? "destructive" : "default"} />
              </div>
            </InputGroup>
          </PromptInput>
        </div>
      </div>
    </PromptInputProvider>
  );
}
