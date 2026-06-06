import { SplitPane } from '@/components/layout/split-pane';
import { ChatPanel } from '@/components/chat/chat-panel';
import { SchemaCanvas } from '@/components/schema/schema-canvas';

export default function Home() {
  return (
    <main className="h-screen w-screen overflow-hidden text-foreground bg-background">
      <SplitPane 
        left={<ChatPanel />} 
        right={<SchemaCanvas />} 
      />
    </main>
  );
}
