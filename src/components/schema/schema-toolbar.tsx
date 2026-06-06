'use client';

import { useReactFlow } from '@xyflow/react';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SchemaToolbar() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-card border border-border rounded-lg shadow-sm p-1 z-10">
      <Button variant="ghost" size="icon" onClick={() => zoomIn()}>
        <ZoomIn className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => zoomOut()}>
        <ZoomOut className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => fitView()}>
        <Maximize className="w-4 h-4" />
      </Button>
    </div>
  );
}
