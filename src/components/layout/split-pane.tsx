'use client';

import { ReactNode } from 'react';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';
import { GripVertical } from 'lucide-react';

interface SplitPaneProps {
  left: ReactNode;
  right: ReactNode;
}

export function SplitPane({ left, right }: SplitPaneProps) {
  return (
    <PanelGroup orientation="horizontal" className="h-screen w-full overflow-hidden bg-background">
      <Panel defaultSize={30} minSize={20} maxSize={800} className="h-full z-10 shadow-xl">
        {left}
      </Panel>
      
      <PanelResizeHandle className="w-1 bg-border hover:bg-accent transition-colors flex items-center justify-center group cursor-col-resize z-20">
        <div className="h-8 w-1.5 rounded-full bg-muted-foreground/30 group-hover:bg-accent transition-colors flex items-center justify-center absolute">
          <GripVertical className="w-3 h-3 text-transparent group-hover:text-background transition-colors" />
        </div>
      </PanelResizeHandle>
      
      <Panel defaultSize={70} className="h-full relative z-0">
        {right}
      </Panel>
    </PanelGroup>
  );
}
