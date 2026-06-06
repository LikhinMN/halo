'use client';

import { Database, Terminal, Code2, Loader2, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import { useSchemaStore } from '@/lib/store/schema-store';

interface ToolResultCardProps {
  toolName: string;
  result: any;
  state: 'call' | 'result';
}

export function ToolResultCard({ toolName, result, state }: ToolResultCardProps) {
  const isGenerating = state === 'call';
  const setSchema = useSchemaStore((state) => state.setSchema);

  useEffect(() => {
    if (!isGenerating && result && result.tables && (toolName === 'generateSchema' || toolName === 'modifySchema')) {
      // Small timeout to let React finish rendering the chat message before potentially heavy graph updates
      const timer = setTimeout(() => {
        setSchema({ tables: result.tables, relationships: result.relationships || [] });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isGenerating, result, toolName, setSchema]);

  if (toolName === 'generateSchema') {
    return (
      <div className="flex flex-col gap-2 p-3 rounded-lg bg-card border border-border shadow-sm my-2">
        <div className="flex items-center gap-2 text-sm font-medium text-accent">
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
          {isGenerating ? 'Generating Schema...' : 'Schema Generated'}
        </div>
        {!isGenerating && result?.tables && (
          <div className="text-xs text-muted-foreground font-mono">
            Generated {result.tables.length} tables and {result.relationships?.length || 0} relationships.
          </div>
        )}
      </div>
    );
  }

  if (toolName === 'generateQuery') {
    return (
      <div className="flex flex-col gap-2 p-3 rounded-lg bg-card border border-border shadow-sm my-2">
        <div className="flex items-center gap-2 text-sm font-medium text-purple-400">
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Terminal className="w-4 h-4" />}
          {isGenerating ? 'Writing Query...' : 'Query Generated'}
        </div>
        {!isGenerating && result?.sql && (
          <pre className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded overflow-x-auto">
            {result.sql}
          </pre>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-3 rounded-lg bg-card border border-border shadow-sm my-2">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
        {isGenerating ? `Running ${toolName}...` : `Completed ${toolName}`}
      </div>
    </div>
  );
}
